import {actionTypes} from "./actionTypes";

const initialState = {
    schedule: null,
    error: null,
    isEdit: false,
    // isEdited: false,
    isLoaded: false
};


export const scheduleReducer = (state, action) => {//action.type===????
    // console.log('scheduleReducer');
    state = state || initialState;

    console.log(action.type);
    switch (action.type) {
        case actionTypes.getScheduleSucceededType:
            return {
                ...state,
                schedule: action.schedule,
                isLoaded: true
            };
        case actionTypes.getScheduleFailedType:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.editScheduleType:
            return {
                ...state,
                isEdit: true,
                // isEdited: false
            };
        case actionTypes.editScheduleSucceededType:
            // console.log("succeed");
            return {
                ...state,
                isEdit: false,
                isLoaded: false
                // isEdited: true
            };
        case actionTypes.editScheduleFailedType:
            return {
                ...state,
                isEdit: false,
                // isEdited: false,
                error: action.error
            };
        default :
            return state;
    }
};