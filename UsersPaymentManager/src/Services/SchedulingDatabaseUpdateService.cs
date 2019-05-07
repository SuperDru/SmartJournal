using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace UsersPaymentManager.Services
{
    public class SchedulingDatabaseUpdateService: IHostedService, IDisposable
    {
        private static Timer _timer;
        private IServiceProvider Services { get; }
        
        public static TimeSpan ExpirationTime
        {
            set => _timer?.Change(TimeSpan.Zero, value);
        }
        
        public SchedulingDatabaseUpdateService(IServiceProvider services)
        {
            Services = services;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, 
                TimeSpan.FromSeconds(60));

            return Task.CompletedTask;
        }

        private async void DoWork(object state)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IDatabaseUpdateService>();

                await scopedProcessingService.UpdateUsers();
                await scopedProcessingService.UpdateGroups();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}