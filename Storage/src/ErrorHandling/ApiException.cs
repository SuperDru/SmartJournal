using System;
using Microsoft.AspNetCore.Http;

namespace Storage
{
    public class ApiException: Exception
    {
        public ApiError Error { get; }
        public int? StatusCode { get; }

        public ApiException(ApiError error, int? statusCode = null): base(error.Message)
        {
            Error = error;
            StatusCode = statusCode ?? StatusCodes.Status500InternalServerError;
        }
    }
}