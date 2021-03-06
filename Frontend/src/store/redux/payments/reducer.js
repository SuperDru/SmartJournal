import {actionTypes} from "./actionTypes";

const initialState = {
    payments: [],
    isLoaded: false
};

export const paymentsReducer = (state = initialState, action) => {
    // state = state || initialState;
    // console.log(action.type);
    switch (action.type) {
        case actionTypes.getPaymentsSucceededType:
            return {
                ...state,
                isLoaded: true,
                payments: action.payments
            };
        case actionTypes.getPaymentsFailedType:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.addPaymentSucceededType:
            return {
                ...state,
                isLoaded: false,
                newPaymentId: action.newPaymentId
            };
        case actionTypes.addPaymentFailedType:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.cancelPaymentSucceededType:
            return {
                ...state,
                isLoaded: false
            };
        case actionTypes.cancelPaymentFailedType:
            return {
                ...state,
                error: action.error
                // isLoaded: false
            };
        default :
            return state;
    }
};
