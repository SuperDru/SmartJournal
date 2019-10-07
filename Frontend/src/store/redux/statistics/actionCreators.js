import {actionTypes} from "./actionTypes";

export const statisticsActionCreators = {
    getAllStatistics: (monthDate) => ({
        type: actionTypes.getAllStatisticsType,
        monthDate
    }),
    getGroupStatistics: (groupId, monthDate) => ({
        type: actionTypes.getGroupStatisticsType,
        groupId, monthDate
    }),
    buildStatistics: (monthDate) => ({
        type: actionTypes.buildStatisticsType,
        monthDate
    })
};