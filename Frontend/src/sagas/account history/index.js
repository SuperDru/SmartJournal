import {actionTypes} from "../../store/redux/account history/actionTypes"
import {call, put, takeLatest, all} from "redux-saga/effects"
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";

export function* getAccountHistorySaga() {
    yield all([getAccountHistoryByStep(), getAccountHistoryByDate()])
}

function* getAccountHistoryByStep() {
    yield takeLatest(actionTypes.getAccountHistoryByStepType, callGetAccountHistoryByStep);
}

function* callGetAccountHistoryByStep({userId, step = 0}) {
    try {
        console.log('saga-get-AccountHistory-by-step');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/account/history/" + userId + "/" + step, headers);
        yield put({type: actionTypes.getAccountHistoryByStepSucceededType, userAccountHistory: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAccountHistoryByStepFailedType, error});
    }
}

function* getAccountHistoryByDate() {
    yield takeLatest(actionTypes.getAccountHistoryByDateType, callGetAccountHistoryByDate);
}

function* callGetAccountHistoryByDate({userId, from, to}) {
    try {
        console.log('saga-get-AccountHistory-by-date');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/account/history/"
            + userId + "?from=" + from + "&to=" + to, headers);
        yield put({type: actionTypes.getAccountHistoryByDateSucceededType, userAccountHistory: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAccountHistoryByDateFailedType, error});
    }
}