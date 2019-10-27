using System;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.Logging;
using Serilog;

namespace StudentsSystem
{
    public interface IScheduleUpdateScopedService
    {
        Task StartUpdate(CancellationToken token);
    }
    
    public class ScheduleUpdateScopedService: IScheduleUpdateScopedService
    {
        private readonly ICacheRepository _cache;
        private readonly ILogger<ScheduleUpdateScopedService> _logger;

        private DateTime _current;
        
        public ScheduleUpdateScopedService(ICacheRepository cache, ILogger<ScheduleUpdateScopedService> logger)
        {
            _cache = cache;
            _logger = logger;
            _current = DateTime.Today.AddDays(-1);
        }
        
        
        private async Task UpdateSchedule()
        {
            if (DateTime.Now.Day == _current.Day) return;
            
            _current = _current.AddDays(1);
            var groups = _cache.GetGroups();
            
            _logger.LogInformation($"Schedule updating, time: {DateTime.Now}");

            foreach (var group in groups)
            {
                group.TrueSchedules.BuildSchedule(group.WeekSchedule, logger: _logger);
                group.TrueSchedules.RemoveAll(x => !x.Lesson && x.Date < DateTime.Today);
            }
            
            await _cache.UpdateGroups();
            
            _logger.LogInformation($"Schedule updated, time: {DateTime.Now}");
        }
        
        public async Task StartUpdate(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                await UpdateSchedule();
                await Task.Delay(10 * 1000, token);
            }
        }
    }
}