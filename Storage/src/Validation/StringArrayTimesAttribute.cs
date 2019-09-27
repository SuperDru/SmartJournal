using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Storage
{
    public class StringArrayTimesAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(!(value is string[] array) || array.Any(item => !string.IsNullOrEmpty(item) && !item.IsCorrectTime()))
            {
                return new ValidationResult("Incorrect format time.");
            }
            return ValidationResult.Success;
        }
    }
}