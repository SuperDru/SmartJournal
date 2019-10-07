using System;
using System.Collections.Concurrent;

namespace Common
{
    public class DatabaseCache
    {
        public ConcurrentDictionary<Guid, User> UsersByGuid { get; set; }
        public ConcurrentDictionary<int, User> UsersById { get; set; }
        public ConcurrentDictionary<Guid, Group> GroupsByGuid { get; set; }
        public ConcurrentDictionary<int, Group> GroupsById { get; set; }
    }
}