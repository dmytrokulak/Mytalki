using MyTalki.Core.Persistence;

namespace MyTalki.Persistence
{
    public class Transaction : ITransaction
    {
        private readonly DomainContext _context;

        public Transaction(DomainContext context)
        {
            _context = context;
        }

        /// <remarks>
        /// All changes in a single call to SaveChanges() are applied in a transaction.
        /// If any of the changes fail, then the transaction is rolled back
        /// and none of the changes are applied to the database.
        /// This means that SaveChanges() is guaranteed to either completely succeed,
        /// or leave the database unmodified if an error occurs.
        /// https://docs.microsoft.com/en-us/ef/core/saving/transactions
        /// </remarks>
        public void Dispose()
        {
            _context.SaveChanges();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
