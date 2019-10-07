import {call, put, takeLatest} from "redux-saga/effects"

import {actionTypes} from "../../store/redux/accounts/actionTypes";

const url = "http://localhost:8200";

export function* getAccountsByGroupId() {
    yield takeLatest(actionTypes.getAccountsByGroupId, callGetAccountsByGroupId);
}

function* callGetAccountsByGroupId({groupId}) {
    try {
        console.log('saga-get-Accounts');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const accounts = yield call(() => fetch(url + "/accounts/group/" + groupId,
            {
                method: "GET",
                headers: headers
            })
            .then(res => res.json())
            .catch(err => console.log(err)));
        yield put({type: actionTypes.getAccountsByGroupIdSucceeded, accounts})
    } catch (e) {
        console.log(e);
        yield put({type: actionTypes.getAccountsByGroupIdFailed});
    }
}
