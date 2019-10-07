import {actionTypes} from "./actionTypes";


export const userActionCreators = {

    getAllUsers: () => ({
        type: actionTypes.getAllUsersType
    }),

    createUser: () => ({
        type: actionTypes.createUserType,
    }),
    createUserSubmit: (data) => ({
        type: actionTypes.createUserSubmitType,
        data
    }),

    deleteUser: (guid) => ({
        type: actionTypes.deleteUserType,
        guid
    }),
    editUser: () => ({
        type: actionTypes.editUserType,
    }),
    editUserSubmit: (guid, data) => ({
        type: actionTypes.editUserSubmitType,
        guid,
        data
    }),
    getUserById: (id) => ({
        type: actionTypes.getUserType,
        guid: id
    }),
};