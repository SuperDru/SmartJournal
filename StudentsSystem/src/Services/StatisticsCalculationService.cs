using System;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    public interface IStatisticsCalculationService
    {
        Task BuildStatistics(DateTime lastMonth);
    }
    
    public class StatisticsCalculationService: IStatisticsCalculationService
    {
        private readonly IServiceProvider _provider;
        private readonly ILogger<StatisticsCalculationService> _logger;

        public StatisticsCalculationService(IServiceProvider provider, ILogger<StatisticsCalculationService> logger)
        {
            _provider = provider;
            _logger = logger;
        }
        
        public async Task BuildStatistics(DateTime lastMonth)
        {
            using (var scope = _provider.CreateScope())
            {
                var cache = scope.ServiceProvider.GetService<ICacheRepository>();
                
                var groups = cache.GetGroups();
                lastMonth = lastMonth.AddDays(- lastMonth.Day + 1);
            
                foreach (var group in groups)
                {
                    var statistics = group.Statistics;
                
                    var attendanceCount = group.Attendance.Count(x => x.Date.IsSameMonth(lastMonth));
                    var attendanceMax = group.TrueSchedules.Count(x => x.Date.IsSameMonth(lastMonth)) * group.Users.Count;
                    var expectedIncome = group.Attendance.Where(x => x.Date.IsSameMonth(lastMonth)).Sum(x => MathF.Abs(x.PaymentAmount));

                    var newStatistics = new Statistics
                    {
                        Date = lastMonth,
                        AttendancePercentage = attendanceMax == 0 ? 100 : attendanceCount * 100 / attendanceMax,
                        LessonsAmount = attendanceMax,
                        PeopleAmount = group.Users.Count,
                        VisitsAmount = attendanceCount,
                        ExpectedIncome = expectedIncome
                    };
                    
                    statistics.Add(newStatistics);
                    
                    _logger.LogInformation("Adding statistics of group with id {id} for month {month}, " +
                                           "attendance percentage = {percentage}, lessons amount = {lessons}, people amount = {people}, " +
                                           "visits amount = {visits}, expected income = {income}",
                        group.Guid, newStatistics.Date, newStatistics.AttendancePercentage, newStatistics.LessonsAmount, 
                        newStatistics.PeopleAmount, newStatistics.VisitsAmount, newStatistics.ExpectedIncome);
                }
                await cache.UpdateGroups();
                
                _logger.LogInformation("Added statistics of all groups for month {month}", lastMonth);
            }
        }
    }
}