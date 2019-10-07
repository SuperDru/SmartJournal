using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Common;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace StudentsSystem
{
    public class ScheduleUpdateHostedService: IHostedService
    {
        private readonly IServiceProvider _provider;
        
        public ScheduleUpdateHostedService(IServiceProvider provider)
        {
            _provider = provider;
        }
        
        public Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _provider.CreateScope())
            {
                var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IScheduleUpdateScopedService>();

                scopedProcessingService.StartUpdate();
            }
            
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}