// import {put, call,takeEvery, takeLatest} from 'redux-saga/effects'
// import * as api from '../fakeApi'
// // import {editUserDataType, editUserSucceededType,
// //     editUserFailedType, initUserDataType,
// //     initUserSucceededType,initUserFailedType,editUserSubmitedType } from "../store/reducerForSaga"
// import {initGroupsFailedType, initGroupsSucceededType, initGroupsType , editGroupsFailedType, editGroupsType,editUserSubmitedType,editGroupsSucceededType} from "./tableReducer";
//
//
// export function* initGroups() {
//     yield takeLatest(initGroupsType, callInitGroups)
// }
//
// function* callInitGroups() {
//     try {
//         console.log('saga-init-groups');
//         const groups = yield call(api.getData);
//         yield put({type: initGroupsSucceededType, groups})
//     } catch (e) {
//         yield put({type: initGroupsFailedType})
//     }
// }
//
//
//
// export function *editUser(){
//     yield takeLatest( editGroupsType, callEditUser)
// }
//
// export function * editUserSubmit() {//
//     yield takeLatest(editGroupsSucceededType, callEditUserSubmit)
// }
//
// function *callEditUserSubmit({user}){
//     console.log('saga-edit-submit');
//     yield call(api.editUser,user);
//     yield put({type: editUserSubmitedType, user})
// }
//
// function *callEditUser({user}) {
//     try {
//         console.log('saga-edit');
//         yield put({type:editGroupsSucceededType});
//         // yield call(api.editUser, user);
//         // yield put({type: editUserSucceededType, user})
//     } catch (e) {
//         yield put({type: editGroupsFailedType})
//     }
// }
//
//
//
//
// // function *editUser(){
// //     yield takeEvery('EDIT_USERS', callEditUser)
// // }
// //
// // function * editUserSubmit() {//
// //     yield takeLatest(editUserSucceededType, callEditUserSubmit)
// // }
// //
// // function *callEditUserSubmit({user}){
// //     console.log('saga-edit-submit');
// //     yield call(api.editUser,user);
// //     yield put({type: editUserSubmitedType, user})
// // }
// //
// // function *callEditUser({user}) {
// //     try {
// //         console.log('saga-edit');
// //         yield put({type:editUserDataType});
// //         // yield call(api.editUser, user);
// //         // yield put({type: editUserSucceededType, user})
// //     } catch (e) {
// //         yield put({type: editUserFailedType})
// //     }
// // }
// //
// // function *initUser(){
// //     yield takeEvery('INIT_USERS', callInitUsers)
// // }
// //
// // function *callInitUsers() {
// //     try {
// //         console.log('saga-init');
// //         //yield put({type:initUserDataType});
// //         const users = yield call(api.getUsers);
// //         yield put({type:'INIT_USER_SUCCEEDED', users})
// //     } catch (e) {
// //         yield put({type: initUserFailedType})
// //     }
// // }
// //
// // export default function* rootSaga() {
// //     console.log('hello-from-saga')
// //     yield all([
// //             editUser(),
// //             initUser()
// //             // editUserSubmit()
// //         ]
// //     )
// // }
