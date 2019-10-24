import {actionTypes} from "./actionTypes";

export const accountHistoryActionCreators = {
    getAccountHistoryByDate: (userId, from, to) => ({
        type: actionTypes.getAccountHistoryByDateType,
        userId, from, to
    }),

    getAccountHistoryByStep: (userId, step) => ({
        type: actionTypes.getAccountHistoryByStepType,
        userId, step
    })
};