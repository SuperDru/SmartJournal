using System;
using Microsoft.AspNetCore.Http;

namespace Storage
{
    public static class RepositoryExtensions
    {
        public static Group GetExistingGroup(this IDatabaseCache cache, Guid groupId)
        {
            var group = cache.GetGroup(groupId);
            
            if (group == null)
                Errors.GroupNotFoundError.Throw(StatusCodes.Status404NotFound);

            return group;
        }
    }
}