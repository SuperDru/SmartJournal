// export const actionTypes = {
//
// //get list of groups
//     getAllGroupsType: 'GET_ALL_GROUPS',
//     getAllGroupsSucceededType: 'GET_ALL_GROUPS_SUCCEEDED',
//     getAllGroupsFailedType: 'GET_ALL_GROUPS_SUCCEEDED',
//
// //creating group
//     createGroupType: 'CREATE_GROUP',
//     createGroupSubmitType: 'CREATE_GROUP_SUBMIT',
//     createGroupSucceededType: 'CREATE_GROUP_SUCCEEDED',
//     createGroupFailedType: 'CREATE_GROUP_FAILED',
//
// //editing group
//     editGroupType: 'EDIT_GROUP',
//     editGroupSubmitType: 'EDIT_GROUP_SUBMIT',
//     editGroupSucceededType: 'EDIT_GROUP_SUCCEEDED',
//     editGroupFailedType: 'EDIT_GROUP_FAILED',
//
// //delete group
//     deleteGroupType: 'DELETE_GROUP',
//     deleteGroupSucceededType: 'DELETE_GROUP_SUCCEEDED',
//     deleteGroupFailedType: 'DELETE_GROUP_FAILED',
//
// //get group by id
//     getGroupByIdType: 'GET_GROUPS_BY_ID',
//     getGroupByIdSucceededType: 'GET_GROUPS_BY_ID_SUCCEEDED',
//     getGroupByIdFailedType: 'GET_GROUPS_BY_ID_SUCCEEDED',
//
//     //get users from group
//     getUsersFromGroupType: 'GET_USERS_FROM_GROUP',
//     getUsersFromGroupSucceededType: 'GET_USERS_FROM_GROUP_SUCCEEDED',
//     getUsersFromGroupFailedType: 'GET_USERS_FROM_GROUP_FAILED',
//
//     //add user to group
//     addUserToGroupType: 'ADD_USER_TO_GROUP',
//     addUserToGroupSubmitType: 'ADD_USER_TO_GROUP_SUBMIT',
//     addUserToGroupSucceededType: 'ADD_USER_TO_GROUP_SUCCEEDED',
//     addUserToGroupFailedType: 'ADD_USER_TO_GROUP_FAILED',
//
//     //delete users or user from group
//     deleteUserFromGroupType: 'DELETE_USER_FROM_GROUP',
//     deleteUserFromGroupSubmitType: 'DELETE_USER_FROM_GROUP_SUBMIT',
//     deleteUserFromGroupSucceededType: 'DELETE_USER_FROM_GROUP_SUCCEEDED',
//     deleteUserFromGroupFailedType: 'DELETE_USER_FROM_GROUP_FAILED',
// };

const initialState = {
    groups: [],
    // users: [], //??????
    isLoaded: false,
    onCreatingGroup: false,
    onCreatingUser: false,
    error: '',
    isUsersAddedToGroup: false
};

// export const groupActionCreators = {
//     getAllGroups: () => ({
//         type: actionTypes.getAllGroupsType
//     }),
//     createGroup: () => ({
//         type: actionTypes.createGroupType,
//     }),
//     createGroupSubmit: (data) => ({
//         type: actionTypes.createGroupSubmitType,
//         data
//     }),
//     getGroupById: (guid) => ({
//         type: actionTypes.getGroupByIdType,
//         guid
//     }),
//     deleteGroup: (guid) => ({
//         type: actionTypes.deleteGroupType,
//         guid
//     }),
//     editGroup: () => ({
//         type: actionTypes.editGroupType,
//     }),
//     editGroupSubmit: (guid, data) => ({
//         type: actionTypes.editGroupSubmitType,
//         guid,
//         data
//     }),
//     addUsersToGroup: (userIds) => ({
//         type: actionTypes.addUserToGroupType,
//         userIds
//     }),
//     addUsersToGroupSubmit: (groupId, userIds) => ({
//         type: actionTypes.addUserToGroupSubmitType,
//         groupId,
//         userIds
//     }),
//     getUsersFromGroup: (groupId) => ({
//         type: actionTypes.getUsersFromGroupType,
//         groupId
//     }),
//     deleteUserFromGroup: (groupId, userId) => ({
//         type: actionTypes.deleteUserFromGroupSubmitType,
//         groupId, userId
//     })
// };
//
// export const groupReducer = (state, action) => {
//
//     state = state || initialState;
//     // console.log(action.type);
//     switch (action.type) {
//         case actionTypes.getAllGroupsSucceededType:
//             return {
//                 ...state,
//                 isLoaded: true,
//                 groups: action.groups
//             };
//         case actionTypes.getAllGroupsFailedType:
//             return {
//                 ...state,
//                 isLoaded: false,
//                 error: action.payload
//             };
//         // case actionTypes.createGroupType:
//         //     return {
//         //         ...state,
//         //         // isLoaded: false,
//         //         // onCreatingGroup: true
//         //     };
//         case actionTypes.createGroupSubmitType:
//             return {
//                 ...state,
//                 // isLoaded: false,
//                 onCreatingGroup: false,
//             };
//         case actionTypes.createGroupSucceededType:
//             // let temp = state.groups;
//             // temp.push(action.group);
//             return {
//                 ...state,
//                 isLoaded: false,
//                 // groups: temp,
//                 newGroup: action.group
//             };
//         case actionTypes.createGroupFailedType:
//             return {
//                 ...state,
//                 error: action.payload
//             };//delete + edit
//         case actionTypes.editGroupSucceededType:
//             return {
//                 ...state,
//                 isLoaded: false,
//             };
//         case actionTypes.editGroupFailedType:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         case actionTypes.deleteGroupSucceededType:
//             return {
//                 ...state,
//                 isLoaded: false
//             };
//         case actionTypes.deleteGroupFailedType:
//             return {
//                 ...state,
//                 // isLoaded: false
//             };
//         case actionTypes.getGroupByIdSucceededType:
//             return {
//                 ...state,
//                 isLoaded: true,
//                 groupById: action.groupById
//             };
//         case actionTypes.getGroupByIdFailedType: {
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         }
//         case actionTypes.getUsersFromGroupSucceededType: {
//             return {
//                 ...state,
//                 usersFromGroup: action.usersFromGroup,
//                 isLoaded: true
//             }
//         }
//         case actionTypes.getUsersFromGroupFailedType: {
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         }
//         case actionTypes.deleteUserFromGroupSucceededType: {
//             return {
//                 ...state,
//                 isLoaded: false
//                 // ok: action.ok,
//             }
//         }
//         case actionTypes.deleteUserFromGroupFailedType: {
//             return {
//                 ...state,
//                 // ok: action.ok,
//             }
//         }
//         case actionTypes.addUserToGroupType: {
//             return {
//                 ...state,
//                 usersToGroup: action.userIds,
//                 isUsersAddedToGroup: false
//             }
//         }
//         case actionTypes.addUserToGroupSucceededType: {
//             return {
//                 ...state,
//                 isLoaded: false,
//                 // usersToGroup: action.usersToGroup
//                 isUsersAddedToGroup: true,
//             }
//         }
//         default :
//             return state;
//     }
// };

