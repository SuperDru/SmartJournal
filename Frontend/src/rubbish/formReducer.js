//
//
// const initialState= {
//     date: '',
//     groupId: '',
//     tableDays: ''
// };
//
//
// export const actionCreators={
//     setDate:()=>({
//         type:'SET_DATA'
//     }),
//     setGroupId:()=>({
//       type: 'SET_GROUP_ID'
//     })
// };
//
//
// export const formReducer=(state,action)=> {
//     console.log('formReducer');
//     state = state | initialState;
//     console.log(action.type);
//     switch (action.type) {
//         case "SET_DATA":
//             return {
//                 ...state,
//                 date: action.date
//             };
//         case "SET_GROUP_ID":
//             return {
//                 ...state,
//                 groupId: action.groupId
//             };
//         default:
//             return state;
//     }
// };