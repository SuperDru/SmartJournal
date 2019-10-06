using System;
using System.Linq;
using System.Threading.Tasks;
using Common;

namespace StudentsSystem
{
    public interface IStatisticsCalculationService
    {
        Task BuildStatistics(DateTime month);
    }
    
    public class StatisticsCalculationService: IStatisticsCalculationService
    {
        private readonly IDatabaseCache _cache;

        public StatisticsCalculationService(IDatabaseCache cache)
        {
            _cache = cache;
        }
        
        public async Task BuildStatistics(DateTime month)
        {
            var groups = _cache.GetGroups();
            var lastMonth = DateTime.Today.AddMonths(-1);
            lastMonth = lastMonth.AddDays(- lastMonth.Day + 1);
            
            foreach (var group in groups)
            {
                var statistics = group.Statistics;
                
                var attendanceCount = group.Attendance.Count(x => x.Date.IsSameMonth(lastMonth));
                var attendanceMax = group.TrueSchedules.Count(x => x.Date.IsSameMonth(lastMonth));
                var expectedIncome = group.Attendance.Where(x => x.Date.IsSameMonth(lastMonth)).Sum(x => x.PaymentAmount);
                
                statistics.Add(new Statistics
                {
                    Date = lastMonth,
                    AttendancePercentage = attendanceCount * 100 / attendanceMax,
                    PeopleAmount = group.Users.Count,
                    VisitsAmount = attendanceCount,
                    ExpectedIncome = expectedIncome
                });
            }
            await _cache.UpdateGroups();

        }
    }
}