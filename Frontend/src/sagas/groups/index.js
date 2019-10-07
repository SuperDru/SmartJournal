import {call, put, takeLatest, all} from 'redux-saga/effects';
import {actionTypes} from "../../store/redux/groups/actionTypes";//action types
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";
//url
// const url = 'http://localhost:8200';

//GROUPS

export function* getGroupsSaga() {
    yield all([
        getGroups(),
        getUsersFromGroup(),
        deleteUserFromGroup(),
        deleteGroup(),
        getGroupById(),
        createGroup(),
        editGroup(),
        addUserToGroupSubmit(),
        addUserToGroup()
    ])
}

function* getGroups() {
    yield takeLatest(actionTypes.getAllGroupsType, callGetGroups)
}

function* callGetGroups() {
    try {
        console.log('saga-get-groups');
        let headers = new Headers();
        // headers.append("Content-type", "text/html");
        // headers.append("Access-Control-Allow-Origin", "*");
        // const groups = yield call(() => fetch(url + '/groups',
        //     {
        //         method: 'GET',
        //         headers: headers,
        //         // mode: "no-cors",
        //         // body: null
        //     }).then(response => response.json())
        //     .catch(error => console.error(error)));
        //
        // console.log('saga-get-groups-groups');
        // console.log('saga groups: ', groups);
        //yield dispatch();

        const response = yield call(httpRequest, "get", url + '/groups', headers);
        yield put({type: actionTypes.getAllGroupsSucceededType, groups: response.data});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAllGroupsFailedType, error});
    }
}

function* createGroup() {
    yield takeLatest(actionTypes.createGroupSubmitType, callCreateGroup);
}

function* callCreateGroup({data}) {
    try {
        console.log("data-from-saga", data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // const group = yield call(() => fetch(url + '/groups',
        //     {
        //         method: 'POST',
        //         headers: headers,
        //         body: JSON.stringify(data)
        //     }).then(response => response.json())
        //     .catch(error => console.log(error)));
        //
        // console.log('saga-create-group', group);

        const response = yield call(httpRequest, "post", url + '/groups', headers, data);
        yield put({type: actionTypes.createGroupSucceededType, group: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.createGroupFailedType, error})
    }
}

function* editGroup() {
    yield takeLatest(actionTypes.editGroupSubmitType, callEditGroup)
}

function* callEditGroup({guid, data}) {
    try {
        console.log("saga-edit ", guid, data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // yield call(() => fetch(url + '/groups/' + guid.toString(),
        //     {
        //         method: 'PUT',
        //         headers: headers,
        //         body: JSON.stringify(data)
        //     }).catch(error => console.log(error)));
        //

        yield call(httpRequest, "put", url + '/groups/' + guid, headers, data);
        yield put({type: actionTypes.editGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editGroupFailedType, error})
    }
}

function* deleteGroup() {
    yield takeLatest(actionTypes.deleteGroupType, callDeleteGroup)
}

function* callDeleteGroup({guid}) {
    try {
        let headers = new Headers();
        console.log("saga-delete ", guid);
        headers.append('Content-Type', "application/json");
        // yield call(() => fetch(url + '/groups/' + guid.toString(),
        //     {
        //         method: 'DELETE',
        //         headers: headers
        //     }).catch(error => console.log(error)));
        //
        // const newURL = url + '/groups/' + guid;
        yield call(httpRequest, "delete", url + '/groups/' + guid, headers);
        yield put({type: actionTypes.deleteGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteGroupFailedType, error})
    }
}

function* getGroupById() {
    yield takeLatest(actionTypes.getGroupByIdType, callGetGroupById)
}

function* callGetGroupById({guid}) {
    try {
        // console.log("saga-get-group-by-id", guid);
        let headers = new Headers();
        // const groupById = yield call(() => fetch(url + '/groups/' + guid,
        //     {
        //         method: 'GET',
        //         headers: headers
        //     }).then(response => response.json())
        //     .catch(error => console.error(error)));


        const response = yield call(httpRequest, "get", url + '/groups/' + guid, headers);
        console.log(response);
        yield put({type: actionTypes.getGroupByIdSucceededType, groupById: response.data});
        // yield put({type: actionTypes.getGroupByIdSucceededType, groupById});
    } catch (error) {
        console.log("error from saga catch", error);
        yield put({type: actionTypes.getGroupByIdFailedType, error});
    }
}

function* getUsersFromGroup() {
    yield takeLatest(actionTypes.getUsersFromGroupType, callGetUsersFromGroup)
}

function* callGetUsersFromGroup({groupId}) {
    try {
        // const usersFromGroup = yield call(() => fetch(url + '/groups/' + groupId + '/users',
        //     {
        //         method: 'GET',
        //     }).then(response => response.json())
        //     .catch(error => console.error(error)));

        const response = yield call(httpRequest, "get", url + '/groups/' + groupId + '/users');
        yield put({type: actionTypes.getUsersFromGroupSucceededType, usersFromGroup: response.data});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getUsersFromGroupFailedType, error});
    }
}

function* addUserToGroup() {
    takeLatest(actionTypes.addUserToGroupType, callAddUserToGroup)
}

function* callAddUserToGroup({userIds}) {//TODO
    if (!userIds.isEmpty()) {
        yield put({type: actionTypes.addUserToGroupSubmitType, userIds})
    }
}

//add user to group
function* addUserToGroupSubmit() {
    yield takeLatest(actionTypes.addUserToGroupSubmitType, callAddUserToGroupSubmit)
}

function* callAddUserToGroupSubmit({groupId, userIds}) {
    try {
        // console.log("saga-add-user-to-group", groupId, userIds);
        let headers = new Headers();
        const data = {
            "userIds": userIds,
            // "UserId": userId,
            "groupId": groupId
        };
        headers.append('Content-Type', "application/json-patch+json");
        // yield call(() => fetch(url + '/users/assign',
        //     {
        //         method: 'POST',
        //         headers: headers,
        //         // mode: "no-cors",
        //         body: JSON.stringify(data)
        //     })
        //     .then(res => console.log(res))
        //     .catch(error => console.log(error)));
        yield call(httpRequest, "post", url + '/users/assign', headers, data);
        yield put({type: actionTypes.addUserToGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.addUserToGroupFailedType, error})
    }
}


//delete user from group

function* deleteUserFromGroup() {
    yield takeLatest(actionTypes.deleteUserFromGroupSubmitType, callDeleteUserFromGroup)
}

function* callDeleteUserFromGroup({groupId, userId, arrayOfUserId}) {
    try {
        let headers = new Headers();
        // console.log("saga-delete-user-from-group ", groupId, userId, arrayOfUserId);
        // headers.append('Content-Type', "application/json");
        // yield call(() => fetch(url + '/users/assign',
        //     {
        //         method: 'DELETE',
        //         headers: headers,
        //         body: JSON.stringify(requestBody)
        //     })
        // // .then(res => console.log(res))
        //     .catch(error => console.log(error)));
        yield call(httpRequest, "delete", url + '/users/assign', headers, {
            "userIds": arrayOfUserId,
            "userId": userId,
            "groupId": groupId
        });
        yield put({type: actionTypes.deleteUserFromGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteUserFromGroupFailedType, error})
    }
}