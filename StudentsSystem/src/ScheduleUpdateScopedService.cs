using System;
using System.Threading;
using System.Threading.Tasks;
using Common;
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

        private DateTime _current;
        
        public ScheduleUpdateScopedService(ICacheRepository cache)
        {
            _cache = cache;
            _current = DateTime.Today.AddDays(-1);
        }
        
        
        private async Task UpdateSchedule()
        {
            if (DateTime.Now.Day == _current.Day) return;
            
            _current = _current.AddDays(1);
            var groups = _cache.GetGroups();

            foreach (var group in groups)
            {
                group.TrueSchedules.BuildSchedule(group.WeekSchedule);
                group.TrueSchedules.RemoveAll(x => !x.Lesson && x.Date < DateTime.Today);
            }
            
            Log.Information($"Schedule updated, time: {DateTime.Now}");

            await _cache.UpdateGroups();
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