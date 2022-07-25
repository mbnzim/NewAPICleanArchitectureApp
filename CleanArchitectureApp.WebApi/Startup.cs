namespace CleanArchitectureApp.WebApi
{
    using CleanArchitectureApp.Application;
    using CleanArchitectureApp.Infrastructure.Persistence;
    using CleanArchitectureApp.Infrastructure.Shared;
    using CleanArchitectureApp.Infrastructure.Shared.Services;
    using CleanArchitectureApp.WebApi.Extensions;
    using CleanArchitectureApp.WebApi.Middlewares;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationLayer();
            services.AddPersistenceInfrastructure(Configuration);
            services.AddSharedInfrastructure(Configuration);
            services.AddControllers();
            services.AddJwtTokenAuthentication(Configuration);
            services.AddApiVersioningExtension();
            services.AddSwaggerConfiguration();
            services.AddHealthChecks();
            services.AddCors();
            // services.AddTransient<newAPIService, newAPIService>();
            services.AddScoped(typeof(newAPIService), typeof(newAPIService));

            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(
            //        builder =>
            //        {
            //            builder.WithOrigins("https://newsapi.org/v2/top-headlines?country=za&apiKey=2b0f0d99644d4ec68cd72722dfb7cce6", "http://localhost:4200")
            //                   .AllowAnyHeader()
            //                   .AllowAnyMethod();
            //        });
            //});

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseCors(builder => builder
            //    .WithOrigins("*")
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .WithExposedHeaders("content-disposition", "content-type"));
            app.UseCors(builder => builder.AllowAnyOrigin()
                                       .AllowAnyHeader()
                                       .AllowAnyMethod());

            app.UseSwaggerSetup();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseHealthChecks("/health");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}