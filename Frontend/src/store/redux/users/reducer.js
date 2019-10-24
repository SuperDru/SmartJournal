import {actionTypes} from "./actionTypes";

const initialState = {
    users: [],
    usersFromGroup: [],
    isLoaded: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.getUserSucceededType:
            return {
                ...state,
                userById: action.userById,
                isLoaded: true
            };
        case actionTypes.createUserType:
            return {
                ...state,
                onCreatingUser: true
            };
        case actionTypes.createUserSubmitType:
            return {
                ...state,
                onCreatingUser: false
            };
        // case actionTypes.createUserFailedType:
        //     return {
        //         ...state,
        //         error: action.error
        //     };
        case actionTypes.deleteUserSucceededType:
            return {
                ...state,
                isLoaded: false
            };
        // case actionTypes.deleteUserFailedType:
        //     return {
        //         ...state,
        //         isLoaded: false,
        //         error: action.error
        //     };
        case actionTypes.createUserSucceededType:
            // console.log(action.user);
            // let temp1 = state.users;
            // temp1.push(action.user);
            return {
                ...state,
                // users: temp1
                newUser: action.user,
                isLoaded: false
            };
        case actionTypes.getAllUsersSucceededType:
            return {
                ...state,
                users: action.users,
                isLoaded: true
            };
        // case actionTypes.getAllUsersFailedType:
        //     // console.log(action.payload);
        //     return {
        //         ...state,
        //         error: action.error
        //         // error: action.payload
        //         // isLoaded:
        //     };
        case actionTypes.editUserSucceededType: {
            return {
                ...state,
                isLoaded: false
            }
        }
        // case actionTypes.editUserFailedType: {
        //     return {
        //         ...state,
        //         error: action.error
        //         // ok: action.ok,
        //     }
        // }
        case actionTypes.getAllUsersFailedType:
        case actionTypes.createUserFailedType:
        case actionTypes.getUserFailedType:
        case actionTypes.deleteUserFailedType:
        case actionTypes.editUserFailedType:
            console.log(action);
            return {
                ...state,
                error: action.error
            };
        default :
            return state;
    }
};
