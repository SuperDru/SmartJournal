using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Common;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace StudentsSystem
{
    public class ScheduleUpdateHostedService: IHostedService
    {
        private readonly IServiceProvider _provider;
        private readonly ILogger<ScheduleUpdateHostedService> _logger;
        
        public ScheduleUpdateHostedService(IServiceProvider provider, ILogger<ScheduleUpdateHostedService> logger)
        {
            _provider = provider;
            _logger = logger;
        }
        
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _provider.CreateScope())
            {
                var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IScheduleUpdateScopedService>();

                _logger.LogInformation("Schedule hosted service started");
                
                await scopedProcessingService.StartUpdate(cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Schedule hosted service stopped");

            return Task.CompletedTask;
        }
    }
}