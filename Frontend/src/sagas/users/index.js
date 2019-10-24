import {call, put, takeLatest, all} from 'redux-saga/effects'
import {actionTypes} from "../../store/redux/users/actionTypes";
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";

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
        yield call(httpRequest, "put", url + '/users/' + guid, headers, data);
        yield put({type: actionTypes.editUserSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editUserFailedType, error})
    }
}

