export const actionTypes = {
    //GET STATISTICS OF ALL GROUPS
    getAllStatisticsType: "GET_ALL_STATISTICS",
    getAllStatisticsSucceededType: "GET_ALL_STATISTICS_SUCCEEDED",
    getAllStatisticsFailedType: "GET_ALL_STATISTICS_FAILED",

    //GET STATISTICS OF GROUP BY GROUP ID
    getGroupStatisticsType: "GET_GROUP_STATISTICS",
    getGroupStatisticsSucceededType: "GET_GROUP_STATISTICS_SUCCEEDED",
    getGroupStatisticsFailedType: "GET_GROUP_STATISTICS_FAILED",

    //Builds statistics at {monthDate} month (only for Development mode)
    buildStatisticsType: "BUILD_STATISTICS",
    buildStatisticsSucceededType: "BUILD_STATISTICS_SUCCEEDED",
    buildStatisticsFailedType: "BUILD_STATISTICS_FAILED",
};