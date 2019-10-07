import {actionTypes} from "./actionTypes";

export const groupActionCreators = {
    getAllGroups: () => ({
        type: actionTypes.getAllGroupsType
    }),
    createGroup: () => ({
        type: actionTypes.createGroupType,
    }),
    createGroupSubmit: (data) => ({
        type: actionTypes.createGroupSubmitType,
        data
    }),
    getGroupById: (guid) => ({
        type: actionTypes.getGroupByIdType,
        guid
    }),
    deleteGroup: (guid) => ({
        type: actionTypes.deleteGroupType,
        guid
    }),
    editGroup: () => ({
        type: actionTypes.editGroupType,
    }),
    editGroupSubmit: (guid, data) => ({
        type: actionTypes.editGroupSubmitType,
        guid,
        data
    }),
    addUsersToGroup: (userIds) => ({
        type: actionTypes.addUserToGroupType,
        userIds
    }),
    addUsersToGroupSubmit: (groupId, userIds) => ({
        type: actionTypes.addUserToGroupSubmitType,
        groupId,
        userIds
    }),
    getUsersFromGroup: (groupId) => ({
        type: actionTypes.getUsersFromGroupType,
        groupId
    }),
    deleteUserFromGroup: (groupId, userId) => ({
        type: actionTypes.deleteUserFromGroupSubmitType,
        groupId, userId
    })
};