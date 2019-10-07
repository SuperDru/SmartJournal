using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace StudentsSystem
{
    public class StatisticsUpdateHostedService: IHostedService, IDisposable
    {
        private Timer _timer;
        private bool _toUpdate = true;
        private readonly IStatisticsCalculationService _statisticsCalculation;

        public StatisticsUpdateHostedService(IStatisticsCalculationService statisticsCalculation)
        {
            _statisticsCalculation = statisticsCalculation;
        }

        private void UpdateStatistics(object state)
        {
            if (DateTime.Today.Day != -1) 
                _toUpdate = true;
            if (DateTime.Today.Day != -1 || !_toUpdate) 
                return;
            _toUpdate = false;

            var lastMonth = DateTime.Today.AddMonths(-1);
            _statisticsCalculation.BuildStatistics(lastMonth);
            
            Log.Information($"Statistics updated, time: {DateTime.Now}");
        }
        
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(UpdateStatistics, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
            
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer.Dispose();
        }
    }
}