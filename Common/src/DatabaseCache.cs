using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Common
{
    public interface IDatabaseCache
    {
        User GetUser(int id);
        User GetUser(Guid guid);
        Task AddUser(User user);
        Task AddOrUpdateUser(User user);
        Task RemoveUser(Guid guid);
        Task RemoveUser(int id);

        Group GetGroup(int id);
        Group GetGroup(Guid guid);
        Task AddGroup(Group group);
        Task AddOrUpdateGroup(Group group);
        Task RemoveGroup(Guid guid);
        Task RemoveGroup(int id);
        
        ICollection<User> GetUsers();
        ICollection<Group> GetGroups();

        Task UpdateGroups();
        Task UpdateUsers();
    }
    
    public class DatabaseCache: IDatabaseCache
    {
        private static ConcurrentDictionary<Guid, User> UsersByGuid { get; set; }
        private static ConcurrentDictionary<int, User> UsersById { get; set; }
        private static ConcurrentDictionary<Guid, Group> GroupsByGuid { get; set; }
        private static ConcurrentDictionary<int, Group> GroupsById { get; set; }
        
        private readonly DatabaseContext _db;
        
        public DatabaseCache(DatabaseContext db)
        {
            _db = db;
            
            UsersByGuid = new ConcurrentDictionary<Guid, User>(db.GetUsersWithIncludes().ToDictionary(u => u.Guid, u => u));
            GroupsByGuid = new ConcurrentDictionary<Guid, Group>(db.GetGroupsWithIncludes().ToDictionary(g => g.Guid, g => g));
            
            UsersById = new ConcurrentDictionary<int, User>(UsersByGuid.ToDictionary(x => x.Value.Id, x => x.Value));
            GroupsById = new ConcurrentDictionary<int, Group>(GroupsByGuid.ToDictionary(x => x.Value.Id, x => x.Value));
        }
        
        public User GetUser(int id)
        {
            return UsersById.TryGetValue(id, out var user) ? user : null;
        }

        public User GetUser(Guid guid)
        {
            return UsersByGuid.TryGetValue(guid, out var user) ? user : null;
        }

        public async Task AddUser(User user)
        {
            if (UsersByGuid.ContainsKey(user.Guid)) return;
            
            _db.Add(user);
            await _db.SaveChangesAsync();

            var newUser = await _db.GetUsersWithIncludes().FirstOrDefaultAsync(x => x.Guid == user.Guid);

            UsersById.TryAdd(newUser.Id, newUser);
            UsersByGuid.TryAdd(newUser.Guid, newUser);
        }

        public async Task AddOrUpdateUser(User user)
        {
            if (UsersByGuid.TryGetValue(user.Guid, out var oldUser))
            {
                _db.Update(user);
                await _db.SaveChangesAsync();
                
                return;
            }
            await AddUser(user);
        }

        public async Task RemoveUser(Guid guid)
        {
            if (UsersByGuid.TryRemove(guid, out var user) && UsersById.TryRemove(user.Id, out user))
            {
                _db.Remove(user);
                await _db.SaveChangesAsync();
            }
        }

        public async Task RemoveUser(int id)
        {
            if (UsersById.TryRemove(id, out var user) && UsersByGuid.TryRemove(user.Guid, out user))
            {
                _db.Remove(user);
                await _db.SaveChangesAsync();
            }
        }

        public Group GetGroup(int id)
        {
            return GroupsById.TryGetValue(id, out var group) ? group : null;
        }

        public Group GetGroup(Guid guid)
        {
            return GroupsByGuid.TryGetValue(guid, out var group) ? group : null;
        }

        public async Task AddGroup(Group group)
        {
            if (GroupsByGuid.ContainsKey(group.Guid)) return;
            
            _db.Add(group);
            await _db.SaveChangesAsync();
            
            var newGroup = await _db.GetGroupsWithIncludes().FirstOrDefaultAsync(x => x.Guid == group.Guid);

            GroupsById.TryAdd(newGroup.Id, newGroup);
            GroupsByGuid.TryAdd(newGroup.Guid, newGroup);
        }

        public async Task AddOrUpdateGroup(Group group)
        {
            if (GroupsByGuid.TryGetValue(group.Guid, out var oldGroup))
            {
                _db.Update(group);
                await _db.SaveChangesAsync();
                
                return;
            }
            await AddGroup(group);
        }

        public async Task RemoveGroup(Guid guid)
        {
            if (GroupsByGuid.TryRemove(guid, out var group) && GroupsById.TryRemove(group.Id, out group))
            {
                _db.Remove(group);
                await _db.SaveChangesAsync();
            }
        }

        public async Task RemoveGroup(int id)
        {
            if (GroupsById.TryRemove(id, out var group) && GroupsByGuid.TryRemove(group.Guid, out group))
            {
                _db.Remove(group);
                await _db.SaveChangesAsync();
            }
        }

        public ICollection<User> GetUsers()
        {
            return UsersById.Values;
        }

        public ICollection<Group> GetGroups()
        {
            return GroupsById.Values;
        }

        public async Task UpdateGroups()
        {
            _db.UpdateRange(GroupsByGuid.Values);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateUsers()
        {
            _db.UpdateRange(UsersByGuid.Values);
            await _db.SaveChangesAsync();
        }
    }
}