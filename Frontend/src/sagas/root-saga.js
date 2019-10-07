import {all} from "redux-saga/effects"
import {getUsersSaga} from "./users";
import {getGroupsSaga} from "./groups";
import {getScheduleSaga} from "./shedule";
import {getAttendanceSaga} from "./attendance";
import {getPaymentsSaga} from "./payments";
import {getStatisticsSaga} from "./statistics";

export default function* rootSaga() {
    console.log('hello-from-root-saga!!!');
    yield all([
        getScheduleSaga(),
        getAttendanceSaga(),
        getPaymentsSaga(),
        getGroupsSaga(),
        getUsersSaga(),
        getStatisticsSaga()
    ])
}