import {actionTypes} from "./actionTypes";

const initialState = {
    allStatistics: [],
    isLoaded: false,
    error: "",
    groupStatistics: null
};

export const statisticsReducer = (state = initialState, action) => {
    // state = state || initialState;
    console.log(action.type);
    switch (action.type) {
        case actionTypes.getAllStatisticsType:
            return {
                ...state,
                isLoaded: false
            };
        case  actionTypes.getAllStatisticsSucceededType:
            return {
                ...state,
                isLoaded: true,
                allStatistics: action.allStatistics,
            };
        case actionTypes.getAllStatisticsFailedType:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.getGroupStatisticsType:
            return {
                ...state,
                isLoaded: false
            };
        case  actionTypes.getGroupStatisticsSucceededType:
            return {
                ...state,
                isLoaded: true,
                groupStatistics: action.groupStatistics,
            };
        case  actionTypes.buildStatisticsSucceededType:
            return {
                ...state,
                // isLoaded: false,
            };
        case actionTypes.buildStatisticsFailedType:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};