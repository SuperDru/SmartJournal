// ////const buildTableType='BUILD_TABLE';
// ////const editTableType='EDIT_TABLE';
// //const fetchUsersType='FETCH_USERS';////
// //const fetchUsersRejectedType="FETCH_USERS_REJECTED";
// //const fetchUsersFulfilledType="FETCH_USERS_FULFILLED";
// const requestUserType='REQUEST_USER_TYPE';
// const receiveUserType='RECEIVE_USER_TYPE';
//
// const postUserDataType='POST_USER_TYPE';
// const changeUserDataType='CHANGE_USER_TYPE';
//
// const initialState={
//     users:[],
//     isLoading:false,
//     isLoaded:false,
//     changeData:false,
//     postData:false,
//     error:null
// };
//
//
// export const actionCreators= {
//     fetchUsers: () => async (dispatch, getState) => {
//         //getState().isLoaded=true;
//         //// if (getState(). === true) {
//         ////     return;
//         //// }
//         //type:fetchUsersType
//         console.log('fetchUsers');
//         dispatch({type: requestUserType});
//         const url = 'https://85e1b4fd.eu.ngrok.io/groups/group_one/attendance?fromdate=2018-08-01&todate=2018-09-01';       // const url = '/groups/group_one/attendance?fromdate=2018-08-01&todate=2018-09-01';
//         const response = await fetch(url);
//         const users = await response.json();
//         dispatch({type: receiveUserType, users});
//     },
//     changeData: (data) => async (dispatch) => {
//         console.log('changeData');
//         dispatch({type: changeUserDataType});
//         const url = 'https://85e1b4fd.eu.ngrok.io/groups/group_one/attendance';
//         fetch(url, {
//             method: 'POST',
//             changedData: {
//                 Date: data.refs.date,
//                 isAttended: true
//             }
//         })
//             .then(function (response) {
//                 return response.json()
//             })
//             .then(function (body) {
//                 console.log(body)
//             });
//         dispatch({type: postUserDataType, data});
//     }
// };
//
// export const usersReducer=(state,action)=> {
//     console.log('usersReducer');
//     state = state || initialState;
//
//     switch (action.type) {
//
//         case requestUserType:
//             return {
//                 ...state,
//                 isLoading: true,
//                 isLoaded: false,
//                 error: action.payload
//             };
//         case receiveUserType:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isLoaded: true,
//                 users: action.users
//             };
//         case changeUserDataType:
//             return{
//                 ...state,
//                 changeData: true,
//                 postData: false,
//                 error:action.payload
//             };
//
//         case postUserDataType:
//             return{
//                 ...state,
//                 changeData: false,
//                 postData: true,
//                 error:action.payload
//             };
//         //case buildTableType:
//         //    return {...state};
//         //case editTableType:
//         //    return {...state};
//         default:
//             return state;
//     }
// };