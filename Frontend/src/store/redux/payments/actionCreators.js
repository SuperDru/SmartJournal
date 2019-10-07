import {actionTypes} from "./actionTypes";

export const paymentsActionCreators = {
    getPayments: (userId, from, to) => ({
        type: actionTypes.getPaymentsType,
        userId,
        from,
        to
    }),
    addPayment: (userId, data) => ({
        type: actionTypes.addPaymentSubmitType,
        userId,
        data
    }),
    cancelPayment: (userId, paymentId) => ({
        type: actionTypes.cancelPaymentType,
        userId,
        paymentId
    }),
};