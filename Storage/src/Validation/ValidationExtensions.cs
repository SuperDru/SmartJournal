using System.Text.RegularExpressions;

namespace Storage
{
    public static class ValidationExtensions
    {
        public static bool IsCorrectTime(this string time)
        {
            const string regex = "(([0-1][0-9])|([2][0-3])):([0-5][0-9])";
            return Regex.IsMatch(time, regex);
        }
    }
}