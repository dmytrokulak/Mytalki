using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using MyTalki.Core.Domain.Exceptions;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class AuthService : IAuthService
    {
        private IEntityRepository _repository;
        private ITransactionFactory<ITransaction> _transactionFactory;

        public AuthService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }

        public async Task<string> LoginAsync(string email, string password, string secret)
        {
            var users = await _repository.GetSomeAsync<User>(predicate: entity => entity.Email == email);
            if (!users.Any())
                return null;
            if (users[0].Password == Encrypt(password, secret))
                return GenerateToken(users[0], secret);
            return null;
        }

        public async Task<string> RegisterAsync(string email, string password, string secret, string firstName, string lastName)
        {
            var users = await _repository.GetSomeAsync<User>(predicate: entity => entity.Email == email);
            if (users.Any())
                return null;

            var user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = Encrypt(password, secret),
                TimeZone = "GMT", //ToDo:: time zone 
                RegisteredAt = DateTimeOffset.Now
            };

            using (var transaction = _transactionFactory.Begin())
            {
                await _repository.AddAsync(user);

                transaction.Save();
            }
          
            return GenerateToken(user, secret);
        }

        public async Task<User> GetCurrentUserAsync(string token)
        {
            var id = GetIdFromToken(token);
            return await _repository.GetAsync<User>(id);
        }

        public async Task<User> GetAdminUserAsync()
        {
            return (await _repository.GetSomeAsync<User>(predicate:user => user.IsAdmin)).Single();
        }

        public async Task ChangePasswordAsync(int userId, string oldPassword, string newPassword, string secret)
        {
            var user = await _repository.GetAsync<User>(userId);
            if (user == null)
                throw new DomainException("No user found.");
            if (user.Password != Encrypt(oldPassword, secret))
                throw new DomainException("Wrong password.");

            using (var transaction = _transactionFactory.Begin())
            {
                user.Password = Encrypt(newPassword, secret);
                transaction.Save();
            }
        }

        public async Task ChangeEmailAsync(int userId, string email)
        {
            var entity = await _repository.GetAsync<User>(userId);
            using (var transaction = _transactionFactory.Begin())
            {
                entity.Email = email;
                transaction.Save();
            }
        }


        private int GetIdFromToken(string input)
        {
            Claim id = null;
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(input);
            var claims = token.Claims;
            id = claims.Single(c => c.Type == "nameid");
            return int.Parse(id.Value);
        }

        private string GenerateToken(User user, string secret)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var now = DateTime.UtcNow;
            var identity = new ClaimsIdentity();
            
            identity.AddClaim(new Claim(ClaimTypes.Sid, user.Id.ToString()));
            
            identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            if (user.IsAdmin)
                identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateJwtSecurityToken(null, null, identity, now, now.Add(TimeSpan.FromHours(1)), now, signingCredentials);
            return handler.WriteToken(token);
        }

        private string Encrypt(string password, string secret)
        {
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
    }
}