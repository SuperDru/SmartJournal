// export const actionTypes = {
//     //get attendance
//     getAttendanceType: 'GET_ATTENDANCE',
//     getAttendanceSucceededType: 'GET_ATTENDANCE_SUCCEEDED',
//     getAttendanceFailedType: 'GET_ATTENDANCE_FAILED',
//
// //edit attendance
//     editAttendanceType: 'EDIT_ATTENDANCE_TYPE',
//     editAttendanceSucceededType: 'EDIT_ATTENDANCE_SUCCEEDED',
//     editAttendanceFailedType: 'EDIT_ATTENDANCE_FAILED',
//     editAttendanceSubmitType: 'EDIT_ATTENDANCE_SUBMIT',
// };
//
// const initialState = {
//     attendance: null,
//     isEdit: false
// };
//
// export const attendanceActionCreators = {
//     getAttendance: (groupId, from, to) => ({
//         type: actionTypes.getAttendanceType,
//         groupId, from, to
//     }),
//     editAttendance: () => ({
//         type: actionTypes.editAttendanceType
//     }),
//     saveEditAttendance: (groupId, data) => ({
//         type: actionTypes.editAttendanceSubmitType,
//         groupId, data
//     })
// };
//
// export const attendanceReducer = (state, action) => {
//     state = state || initialState;
//     // console.log(action.type);
//     switch (action.type) {
//         case actionTypes.getAttendanceSucceededType:
//             return {
//                 ...state,
//                 attendance: action.attendance,
//                 isLoaded: true
//             };
//         case actionTypes.getAttendanceFailedType:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         case actionTypes.editAttendanceType:
//             return {
//                 ...state,
//                 isEdit: true,
//                 // isEdited: false
//             };
//         case actionTypes.editAttendanceSucceededType:
//             return {
//                 ...state,
//                 isEdit: false,
//             };
//         case actionTypes.editAttendanceFailedType:
//             return {
//                 ...state,
//                 isEdit: false,
//                 error: action.payload
//             };
//         default :
//             return state;
//     }
// };
//
//
