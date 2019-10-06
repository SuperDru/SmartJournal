using System;

namespace StudentsSystem
{
    public static class DateTimeExtensions
    {
        public static bool IsSameMonth(this DateTime originDate, DateTime date)
        {
            return originDate.Year == date.Year && originDate.Month == date.Month;
        }
        
        public static bool LaterThisMonth(this DateTime originDate, DateTime date)
        {
            return originDate.Year > date.Year || originDate.Year == date.Year && originDate.Month > date.Month;
        }
        
        public static bool EarlierThisMonth(this DateTime originDate, DateTime date)
        {
            return originDate.Year < date.Year || originDate.Year == date.Year && originDate.Month < date.Month;
        }
    }
}