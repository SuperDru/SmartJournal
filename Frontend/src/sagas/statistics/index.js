import {call, put, takeLatest, all} from 'redux-saga/effects'
import {actionTypes} from "../../store/redux/statistics/actionTypes";
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";

//STATISTICS

export function* getStatisticsSaga() {
    yield all([getAllStatistics(), getGroupStatistics(), buildStatistics()])
}

function* getAllStatistics() {
    yield takeLatest(actionTypes.getAllStatisticsType, callGetAllStatistics);
}

function* callGetAllStatistics({monthDate}) {
    try {
        console.log('saga-get-Statistics', monthDate);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/statistics/" + "?monthDate=" + monthDate, headers);
        yield put({type: actionTypes.getAllStatisticsSucceededType, allStatistics: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAllStatisticsFailedType, error});
    }
}

function* getGroupStatistics() {
    yield takeLatest(actionTypes.getGroupStatisticsType, callGetGroupStatistics)
}

function* callGetGroupStatistics({groupId, monthDate}) {
    try {
        console.log('saga-get-Statistics');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/statistics/" + groupId +
            "?monthDate=" + monthDate, headers);
        yield put({type: actionTypes.getGroupStatisticsSucceededType, allStatistics: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getGroupStatisticsFailedType, error});
    }
}

function* buildStatistics() {
    yield takeLatest(actionTypes.buildStatisticsType, callBuildStatistics)
}

function* callBuildStatistics({monthDate}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-schedule");
        headers.append('Content-Type', "application/json");
        yield call(httpRequest, "put", url + "/schedule/" +
            "?monthDate=" + monthDate, headers);
        yield put({type: actionTypes.buildStatisticsSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.buildStatisticsFailedType, error})
    }
}
