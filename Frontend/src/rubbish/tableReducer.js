// //init
// export const initGroupsType='INIT_GROUPS';
// export const initGroupsSucceededType='INIT_GROUPS_SUCCEEDED';
// export const initGroupsFailedType='INIT_GROUPS_FAILED';
//
// //edit
// export const editGroupsType='EDIT_GROUPS_TYPE';
// export const editGroupsSucceededType='EDIT_GROUPS_SUCCEEDED';
// export const editGroupsFailedType='EDIT_GROUPS_FAILED';
//
// export const editUserSubmitedType='EDIT_GROUPS_SUBMITED';
// //add
// export const addUserDataType='ADD_USER_TYPE';
//
// //delete
//
// const initialState={
//     groups:[],
//     isLoading:false,
//     isLoaded: false,
//     isEdit:false,
//     isEdited:false,
//     error: ''
// };
//
// export const actionCreators= {
//     // addUser: () => (users) => ({
//     //     type: addUserDataType,
//     //     users: users
//     // }),
//
//     editGroups: () => ({
//         type: editGroupsType,
//     }),
//
//     saveData: () => ({
//         type: editGroupsSucceededType
//     }),
//
//     deleteRow: () => id => ({
//         type: 'DELETE_ROW',
//         id,
//     }),
//
//     initGroups: () => ({
//         type: initGroupsType
//     })
// };
//
// export const tableReducer=(state, action)=> {
//     //console.log('usersReducer');
//     state = state || initialState;
//     // console.log(action.type);
//     switch (action.type) {
//         // case initGroupsSucceededType:
//         //     console.log('init-succeeded');
//         //     // console.log(action.users);
//         //     let groups = new Map();
//         //     action.groups.map(group => {
//         //         groups.set(group.id.toString(), group);
//         //     });
//         //     return {
//         //         ...state,
//         //         isLoading: false,
//         //         isLoaded: true,
//         //         groups: groups
//         //     };
//         // case initGroupsFailedType:
//         //     return {
//         //         ...state,
//         //         isLoading: false,
//         //         isLoaded: false,
//         //         error: action.payload
//         //     };
//         // case editGroupsType:
//         //     return {
//         //         ...state,
//         //         isEdit: true,
//         //         isEdited: false
//         //     };
//         // case editGroupsSucceededType:
//         //     return {
//         //         ...state,
//         //         isEdit: false,
//         //         isEdited: true
//         //     };
//         // case editGroupsFailedType:
//         //     return {
//         //         ...state,
//         //         isEdit: false,
//         //         isEdited: false,
//         //         error: action.payload
//         //     };
//         default:
//             return state;
//     }
// };