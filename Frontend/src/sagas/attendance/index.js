import {call, put, takeLatest, all} from "redux-saga/effects"
import {actionTypes} from "../../store/redux/attendance/actionTypes";//action types
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";
//url
// const url = "http://localhost:8200";

export function* getAttendanceSaga() {
    yield all([getAttendance(), editAttendance()])
}

function* getAttendance() {
    yield takeLatest(actionTypes.getAttendanceType, callGetAttendance);
}

function* callGetAttendance({groupId, from, to}) {
    try {
        console.log('saga-get-Attendance');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/attendance/" + groupId
            + "?from=" + from + "&to=" + to, headers);
        yield put({type: actionTypes.getAttendanceSucceededType, attendance: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAttendanceFailedType, error});
    }
}

//edit attendance
function* editAttendance() {
    yield takeLatest(actionTypes.editAttendanceSubmitType, callEditAttendance)
}

function* callEditAttendance({groupId, data}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-Attendance", data);
        headers.append('Content-Type', "application/json");//
        yield call(httpRequest, "put", url + "/attendance/" + groupId, headers, data);
        yield put({type: actionTypes.editAttendanceSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editAttendanceFailedType, error})
    }
}
