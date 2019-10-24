import {actionTypes} from "./actionTypes";

const initialState = {
    userAccountHistory: [],
    isLoaded: false,
    error: null
};

export const accountHistoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.getAccountHistoryByDateSucceededType:
        case actionTypes.getAccountHistoryByStepSucceededType:
            return {
                ...state,
                userAccountHistory: state.userAccountHistory.concat(action.userAccountHistory),
                isLoaded: true,
            };
        case actionTypes.getAccountHistoryByDateFailedType:
        case actionTypes.getAccountHistoryByStepFailedType:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};