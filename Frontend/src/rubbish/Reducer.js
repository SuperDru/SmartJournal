// //init
// export const initUserDataType='INIT_USER_TYPE';
// export const initUserSucceededType='INIT_USER_SUCCEEDED';
// export const initUserFailedType='INIT_USER_FAILED';
//
// //edit
// export const editUserDataType='EDIT_USER_TYPE';
// export const editUserSucceededType='EDIT_USER_SUCCEEDED';
// export const editUserFailedType='EDIT_USER_FAILED';
//
// export const editUserSubmitedType='EDIT_USER_SUBMITED';
// //add
// export const addUserDataType='ADD_USER_TYPE';
//
// //delete
//
// const initialState={
//     users:[],
//     isLoading:false,
//     isLoaded: false,
//     isEdit:false,
//     isEdited:false,
//     error: ''
// };
//
//
// export const actionCreators= {
//     addUser: () => (users) => ({
//         type: addUserDataType,
//         users: users
//     }),
//
//     editUsers: () => ({
//         type: 'EDIT_USERS',
//     }),
//
//     saveData: () => ({
//         type: 'EDIT_USER_SUCCEEDED',
//     }),
//
//     deleteRow: () => id => ({
//         type: 'DELETE_ROW',
//         id,
//     }),
//
//     initUsers: () => ({
//         type: 'INIT_USERS'
//     })
// };
//
// export const usersReducer=(state,action)=> {
//     console.log('usersReducer');
//     state = state || initialState;
//     console.log(action.type);
//     switch (action.type) {
//         // case initUserDataType:
//         //   console.log('init_users');
//         // return {
//         //   ...state,
//         // isLoading: true
//         //};
//
//         //case 'INIT_USER_SUCCEEDED':
//         //    console.log('init-succeeded');
//         //    return {
//         //        ...state,
//         //        isLoading: false,
//         //        isLoaded: true,
//         //        users: action.users
//         //    };
//
//         case initUserSucceededType:
//             console.log('init-succeeded');
//             // console.log(action.users);
//             return {
//                 ...state,
//                 isLoading: false,
//                 isLoaded: true,
//                 users: action.users
//             };
//         case initUserFailedType:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isLoaded: false,
//                 error: action.payload
//             };
//         case editUserDataType:
//             return {
//                 ...state,
//                 isEdit: true,
//                 isEdited: false
//             };
//         case editUserSucceededType:
//             return {
//                 ...state,
//                 isEdit: false,
//                 isEdited: true
//             };
//         case editUserFailedType:
//             return {
//                 ...state,
//                 isEdit: false,
//                 isEdited: false,
//                 error: action.payload
//             };
//         default:
//             return state;
//      }
// };