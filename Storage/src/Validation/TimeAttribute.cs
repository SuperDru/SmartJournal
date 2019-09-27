using System.ComponentModel.DataAnnotations;

namespace Storage
{
    public class TimeAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(!(value is string time) || !time.IsCorrectTime())
            {
                return new ValidationResult("Incorrect format time.");
            }
            return ValidationResult.Success;
        }
    }
}