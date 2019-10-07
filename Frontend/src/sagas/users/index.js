import {call, put, takeLatest, all} from 'redux-saga/effects'
import {actionTypes} from "../../store/redux/users/actionTypes";
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";
//url
// const url = 'http://localhost:8200';

//USERS

export function* getUsersSaga() {
    yield all([createUser(), getUser(), getAllUsers(), editUser(), deleteUser()])
}


function* createUser() {
    yield takeLatest(actionTypes.createUserSubmitType, callCreateUser)
}

function* callCreateUser({data}) {
    try {
        let headers = new Headers();
        console.log("saga-create-user: ", data);
        headers.append('Content-Type', "application/json");
        // const user = yield call(() => fetch(url + '/users',
        //     {
        //         method: 'POST',
        //         headers: headers,
        //         body: JSON.stringify(data)
        //     }).then(response => response.json())
        //     .catch(error => console.log(error)));

        const response = yield call(httpRequest, "post", url + '/users', headers, data);
        yield put({type: actionTypes.createUserSucceededType, user: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.createUserFailedType, error})
    }
}

function* getUser() {
    yield takeLatest(actionTypes.getUserType, callGetUser)
}

function* callGetUser({guid}) {
    try {
        // const userById = yield call(() => fetch(url + '/users/' + guid,
        //     {
        //         method: 'GET',
        //     }).then(response => response.json())
        // // .then(data => {
        // //     console.log(data)
        // // })
        //     .catch(error => console.error(error)));
        let headers = new Headers();
        const response = yield call(httpRequest, "get", url + '/users/' + guid, headers);
        yield put({type: actionTypes.getUserSucceededType, userById: response.data});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getUserFailedType, error});
    }
}

function* getAllUsers() {
    yield takeLatest(actionTypes.getAllUsersType, callGetAllUsers)
}

function* callGetAllUsers() {
    try {
        console.log("hello from saga get users!!");
        let headers = new Headers();
        // const users = yield call(() => fetch(url + '/users',
        //     {
        //         method: 'GET',
        //         headers: headers
        //     }).then(response => response.json())
        //     .catch(error => console.error(error)));
        // console.log("saga-get-user:", users);
        const response = yield call(httpRequest, "get", url + '/users', headers);
        yield put({type: actionTypes.getAllUsersSucceededType, users: response.data});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAllUsersFailedType, error});
    }
}

function* deleteUser() {
    yield takeLatest(actionTypes.deleteUserType, callDeleteUser)
}

function* callDeleteUser({guid}) {
    try {
        let headers = new Headers();
        console.log("saga-delete-user ", guid);
        headers.append('Content-Type', "application/json");
        // const res = yield call(() => fetch(url + '/users/' + guid,
        //     {
        //         method: 'DELETE',
        //         headers: headers
        //     }).then(response => response)
        //     .catch(error => console.log(error)));
        // console.log(res);
        yield call(httpRequest, "delete", url + '/users/' + guid, headers);
        yield put({type: actionTypes.deleteUserSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteUserFailedType, error})
    }
}

function* editUser() {
    yield takeLatest(actionTypes.editUserSubmitType, callEditUser)
}

function* callEditUser({guid, data}) {
    try {
        // console.log("saga-edit-user", guid, data);
        // console.log("saga-edit-user-data", JSON.stringify(data));
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // const res = yield call(() => fetch(url + '/users/' + guid,
        //     {
        //         method: 'PUT',
        //         headers: headers,
        //         // mode: "no-cors",
        //         body: JSON.stringify(data)
        //     }).catch(error => console.log(error)));
        yield call(httpRequest, "put", url + '/users/' + guid, headers, data);
        yield put({type: actionTypes.editUserSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editUserFailedType, error})
    }
}

