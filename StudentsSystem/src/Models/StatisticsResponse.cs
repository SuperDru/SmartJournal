using System;

namespace StudentsSystem
{
    public class StatisticsResponse
    {
        public int PeopleAmount { get; set; }
        public int AttendancePercentage { get; set; }
        public int VisitsAmount { get; set; }
        public float ExpectedIncome { get; set; } 
        public DateTime Date { get; set; }
    }
}