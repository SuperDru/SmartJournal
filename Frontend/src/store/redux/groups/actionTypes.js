export const actionTypes = {

//get list of groups
    getAllGroupsType: 'GET_ALL_GROUPS',
    getAllGroupsSucceededType: 'GET_ALL_GROUPS_SUCCEEDED',
    getAllGroupsFailedType: 'GET_ALL_GROUPS_FAILED',

//creating group
    createGroupType: 'CREATE_GROUP',
    createGroupSubmitType: 'CREATE_GROUP_SUBMIT',
    createGroupSucceededType: 'CREATE_GROUP_SUCCEEDED',
    createGroupFailedType: 'CREATE_GROUP_FAILED',

//editing group
    editGroupType: 'EDIT_GROUP',
    editGroupSubmitType: 'EDIT_GROUP_SUBMIT',
    editGroupSucceededType: 'EDIT_GROUP_SUCCEEDED',
    editGroupFailedType: 'EDIT_GROUP_FAILED',

//delete group
    deleteGroupType: 'DELETE_GROUP',
    deleteGroupSucceededType: 'DELETE_GROUP_SUCCEEDED',
    deleteGroupFailedType: 'DELETE_GROUP_FAILED',

//get group by id
    getGroupByIdType: 'GET_GROUPS_BY_ID',
    getGroupByIdSucceededType: 'GET_GROUPS_BY_ID_SUCCEEDED',
    getGroupByIdFailedType: 'GET_GROUPS_BY_ID_FAILED',

    //get users from group
    getUsersFromGroupType: 'GET_USERS_FROM_GROUP',
    getUsersFromGroupSucceededType: 'GET_USERS_FROM_GROUP_SUCCEEDED',
    getUsersFromGroupFailedType: 'GET_USERS_FROM_GROUP_FAILED',

    //add user to group
    addUserToGroupType: 'ADD_USER_TO_GROUP',
    addUserToGroupSubmitType: 'ADD_USER_TO_GROUP_SUBMIT',
    addUserToGroupSucceededType: 'ADD_USER_TO_GROUP_SUCCEEDED',
    addUserToGroupFailedType: 'ADD_USER_TO_GROUP_FAILED',

    //delete users or user from group
    deleteUserFromGroupType: 'DELETE_USER_FROM_GROUP',
    deleteUserFromGroupSubmitType: 'DELETE_USER_FROM_GROUP_SUBMIT',
    deleteUserFromGroupSucceededType: 'DELETE_USER_FROM_GROUP_SUCCEEDED',
    deleteUserFromGroupFailedType: 'DELETE_USER_FROM_GROUP_FAILED',
};