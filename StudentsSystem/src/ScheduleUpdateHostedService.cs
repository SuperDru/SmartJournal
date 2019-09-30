using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Common;

namespace StudentsSystem
{
    public class ScheduleUpdateHostedService: IHostedService, IDisposable
    {
        private readonly IDatabaseCache _cache;
        private Timer _timer;

        private DateTime _current;
        
        public ScheduleUpdateHostedService(IDatabaseCache cache)
        {
            _cache = cache;
            _current = DateTime.Today.AddDays(-1);
        }

        private void UpdateSchedule(object state)
        {
            if (DateTime.Now.Day == _current.Day) return;
            
            _current = _current.AddDays(1);
            var groups = _cache.GetGroups();

            foreach (var group in groups)
            {
                group.TrueSchedules.BuildSchedule(group.WeekSchedule);
                group.TrueSchedules.RemoveAll(x => !x.Lesson && x.Date < DateTime.Today);
            }

            _cache.UpdateGroups();
        }
        
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(UpdateSchedule, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
            
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