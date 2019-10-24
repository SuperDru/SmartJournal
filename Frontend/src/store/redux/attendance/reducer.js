import {actionTypes} from "./actionTypes";

const initialState = {
    attendance: null,
    isEdit: false,
    isLoaded: false,
    isEdited: false
};

export const attendanceReducer = (state = initialState, action) => {
    // state = state || initialState;
    // console.log(action.type);
    switch (action.type) {
        case actionTypes.getAttendanceSucceededType:
            return {
                ...state,
                attendance: action.attendance,
                isLoaded: true,
                isEdited: false
            };
        case actionTypes.getAttendanceFailedType:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.editAttendanceType:
            return {
                ...state,
                isEdit: true,
                // isEdited: false
            };
        case actionTypes.editAttendanceSucceededType:
            return {
                ...state,
                isEdit: false,
                isLoaded: false,
                isEdited: true
            };
        case actionTypes.editAttendanceFailedType:
            return {
                ...state,
                isEdit: false,
                error: action.error
            };
        default :
            return state;
    }
};
