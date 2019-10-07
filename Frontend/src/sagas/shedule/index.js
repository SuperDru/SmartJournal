import {call, put, takeLatest, all} from 'redux-saga/effects'
import {actionTypes} from "../../store/redux/schedule/actionTypes";
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";

//url
// const url = 'http://localhost:8200';

//SCHEDULE

export function* getScheduleSaga() {
    yield all([getSchedule(),editSchedule()])
}

function* getSchedule() {
    yield takeLatest(actionTypes.getScheduleType, callGetSchedule);
}

function* callGetSchedule({groupId, from, to}) {
    try {
        console.log('saga-get-schedule');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // const schedule = yield call(() => fetch(url + "/schedule/" + groupId +
        //     "?from=" + from + "&to=" + to,
        //     {
        //         method: "GET",
        //         headers: headers
        //     })
        //     .then(res => res.json())
        //     .catch(err => console.log(err)));
        const response = yield call(httpRequest, "get", url + "/schedule/" + groupId +
            "?from=" + from + "&to=" + to, headers);
        yield put({type: actionTypes.getScheduleSucceededType, schedule: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getScheduleFailedType, error});
    }
}

function* editSchedule() {
    yield takeLatest(actionTypes.editScheduleSubmitType, callEditSchedule)
}

function* callEditSchedule({groupId, data}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-schedule");
        headers.append('Content-Type', "application/json");
        // yield call(() => fetch(url + "/schedule/" + groupId,
        //     {
        //         method: 'PUT',
        //         headers: headers,
        //         body: JSON.stringify(data)
        //     }).catch(error => console.log(error)));
        yield call(httpRequest, "put", url + "/schedule/" + groupId, headers, data);
        yield put({type: actionTypes.editScheduleSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editScheduleFailedType, error})
    }
}
