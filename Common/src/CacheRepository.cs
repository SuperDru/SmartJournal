using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Common
{
    public interface ICacheRepository
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
    
    public class CacheRepository: ICacheRepository
    {
        private readonly DatabaseContext _db;
        private readonly DatabaseCache _cache;
        
        public CacheRepository(DatabaseContext db, DatabaseCache cache)
        {
            _db = db;
            _cache = cache;
            
            _cache.UsersByGuid = new ConcurrentDictionary<Guid, User>(db.GetUsersWithIncludes().ToDictionary(u => u.Guid, u => u));
            _cache.GroupsByGuid = new ConcurrentDictionary<Guid, Group>(db.GetGroupsWithIncludes().ToDictionary(g => g.Guid, g => g));
            
            _cache.UsersById = new ConcurrentDictionary<int, User>(_cache.UsersByGuid.ToDictionary(x => x.Value.Id, x => x.Value));
            _cache.GroupsById = new ConcurrentDictionary<int, Group>(_cache.GroupsByGuid.ToDictionary(x => x.Value.Id, x => x.Value));
        }
        
        public User GetUser(int id)
        {
            return _cache.UsersById.TryGetValue(id, out var user) ? user : null;
        }

        public User GetUser(Guid guid)
        {
            return _cache.UsersByGuid.TryGetValue(guid, out var user) ? user : null;
        }

        public async Task AddUser(User user)
        {
            if (_cache.UsersByGuid.ContainsKey(user.Guid)) return;
            
            _db.Add(user);
            await _db.SaveChangesAsync();

            var newUser = await _db.GetUsersWithIncludes().FirstOrDefaultAsync(x => x.Guid == user.Guid);

            _cache.UsersById.TryAdd(newUser.Id, newUser);
            _cache.UsersByGuid.TryAdd(newUser.Guid, newUser);
        }

        public async Task AddOrUpdateUser(User user)
        {
            if (_cache.UsersByGuid.TryGetValue(user.Guid, out var oldUser))
            {
                _db.Update(user);
                await _db.SaveChangesAsync();
                
                return;
            }
            await AddUser(user);
        }

        public async Task RemoveUser(Guid guid)
        {
            if (_cache.UsersByGuid.TryRemove(guid, out var user) && _cache.UsersById.TryRemove(user.Id, out user))
            {
                _db.Remove(user);
                await _db.SaveChangesAsync();
            }
        }

        public async Task RemoveUser(int id)
        {
            if (_cache.UsersById.TryRemove(id, out var user) && _cache.UsersByGuid.TryRemove(user.Guid, out user))
            {
                _db.Remove(user);
                await _db.SaveChangesAsync();
            }
        }

        public Group GetGroup(int id)
        {
            return _cache.GroupsById.TryGetValue(id, out var group) ? group : null;
        }

        public Group GetGroup(Guid guid)
        {
            return _cache.GroupsByGuid.TryGetValue(guid, out var group) ? group : null;
        }

        public async Task AddGroup(Group group)
        {
            if (_cache.GroupsByGuid.ContainsKey(group.Guid)) return;
            
            _db.Add(group);
            await _db.SaveChangesAsync();
            
            var newGroup = await _db.GetGroupsWithIncludes().FirstOrDefaultAsync(x => x.Guid == group.Guid);

            _cache.GroupsById.TryAdd(newGroup.Id, newGroup);
            _cache.GroupsByGuid.TryAdd(newGroup.Guid, newGroup);
        }

        public async Task AddOrUpdateGroup(Group group)
        {
            if (_cache.GroupsByGuid.TryGetValue(group.Guid, out var oldGroup))
            {
                _db.Update(group);
                await _db.SaveChangesAsync();
                
                return;
            }
            await AddGroup(group);
        }

        public async Task RemoveGroup(Guid guid)
        {
            if (_cache.GroupsByGuid.TryRemove(guid, out var group) && _cache.GroupsById.TryRemove(group.Id, out group))
            {
                _db.Remove(group);
                await _db.SaveChangesAsync();
            }
        }

        public async Task RemoveGroup(int id)
        {
            if (_cache.GroupsById.TryRemove(id, out var group) && _cache.GroupsByGuid.TryRemove(group.Guid, out group))
            {
                _db.Remove(group);
                await _db.SaveChangesAsync();
            }
        }

        public ICollection<User> GetUsers()
        {
            return _cache.UsersById.Values;
        }

        public ICollection<Group> GetGroups()
        {
            return _cache.GroupsById.Values;
        }

        public async Task UpdateGroups()
        {
            _db.UpdateRange(_cache.GroupsByGuid.Values);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateUsers()
        {
            _db.UpdateRange(_cache.UsersByGuid.Values);
            await _db.SaveChangesAsync();
        }
    }
}