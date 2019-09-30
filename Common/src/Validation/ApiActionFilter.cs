using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Common
{
    public class ApiActionFilter: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            { 
                var firstError = context.ModelState.Values.First();
                Errors.ValidationError(firstError.Errors.First().ErrorMessage).Throw(StatusCodes.Status400BadRequest);
            }
            base.OnActionExecuting(context);
        }
    }
}