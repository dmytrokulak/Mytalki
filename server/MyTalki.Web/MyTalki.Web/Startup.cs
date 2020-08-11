using System;
using System.IO;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Services;
using MyTalki.Domain.Services.Impl;
using MyTalki.Persistence;
using MyTalki.Persistence.Repositories;
using MyTalki.Web.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace MyTalki.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            }).CreateMapper());

            services.AddScoped<ITransaction, Transaction>();
            services.AddScoped<ITransactionFactory<ITransaction>, TransactionFactory<Transaction>>();
            services.AddDbContext<DomainContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("AppDb")));
            services.AddScoped<IEntityRepository, EntityRepository>();
            services.AddScoped<ILessonTypeService, LessonTypeService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICalendarService, CalendarService>();
            services.AddScoped<IBookingService, BookingService>();

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyTalki", Version = "v1" });
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "MyTalki.Web.xml"));
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var serverSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["ServerSecret"]));
                    options.TokenValidationParameters = new
                        TokenValidationParameters
                        {
                            IssuerSigningKey = serverSecret,
                            RequireExpirationTime = true,
                            ValidateAudience = false,
                            ValidateIssuer = false
                        };
                });
            services.AddAuthorization(options => { options.AddPolicy("Admin", policy => policy.RequireRole("Admin")); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(opt => opt.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().WithExposedHeaders("Authorization").WithHeaders("PATCH"));

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyTalki API V1");
                c.RoutePrefix = string.Empty;
                c.DocExpansion(DocExpansion.None);
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Init db
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<DomainContext>();
            context.Database.EnsureCreated();
        }
    }
}
