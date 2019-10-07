// //Расписание
// const requestScheduleType='REQUEST_SCHEDULE_TYPE';
// const receiveScheduleType='RECEIVE_SCHEDULE_TYPE';
//
// const initialState= {
//     schedule: [],
//     isLoading: false,
//     isLoaded: false,
//     error: null
// };
//
// export const actionCreators= {
//     fetchSchedule: () => async (dispatch) => {
//         console.log('fetchSchedule');
//         dispatch({type: requestScheduleType});
//         const url = '/groups/group_one/attendance';
//        const response = await fetch(url);
//         //const response = 'schedule.json';
//         const schedule = await response.json();
//         dispatch({type: receiveScheduleType, schedule});
//     }
// };
//
// export const scheduleReducer=(state,action)=>{
//     state=state||initialState;
//     switch (action.type) {
//         case requestScheduleType:
//             return{
//                 ...state,
//                 isLoading: true,
//                 error: action.payload
//             };
//         case receiveScheduleType:
//             return{
//                 ...state,
//                 isLoading: false,
//                 schedule: action.schedule
//             };
//         default :
//             return state;
//     }
// };