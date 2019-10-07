using System;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.DependencyInjection;

namespace StudentsSystem
{
    public interface IStatisticsCalculationService
    {
        Task BuildStatistics(DateTime month);
    }
    
    public class StatisticsCalculationService: IStatisticsCalculationService
    {
        private readonly IServiceProvider _provider;

        public StatisticsCalculationService(IServiceProvider provider)
        {
            _provider = provider;
        }
        
        public async Task BuildStatistics(DateTime month)
        {
            using (var scope = _provider.CreateScope())
            {
                var cache = scope.ServiceProvider.GetService<ICacheRepository>();
                
                var groups = cache.GetGroups();
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
                await cache.UpdateGroups();
            }
        }
    }
}