// export const actionTypes = {
//
// //get list of groups
//     getPaymentsType: 'GET_PAYMENTS',
//     getPaymentsSucceededType: 'GET_PAYMENTS_SUCCEEDED',
//     getPaymentsFailedType: 'GET_PAYMENTS_SUCCEEDED',
//
// //creating group
//     addPaymentType: 'ADD_PAYMENT',
//     addPaymentSubmitType: 'ADD_PAYMENT_SUBMIT',
//     addPaymentSucceededType: 'ADD_PAYMENT_SUCCEEDED',
//     addPaymentFailedType: 'ADD_PAYMENT_FAILED',
//
// //delete group
//     cancelPaymentType: 'DELETE_PAYMENT',
//     cancelPaymentSucceededType: 'DELETE_PAYMENT_SUCCEEDED',
//     cancelPaymentFailedType: 'DELETE_PAYMENT_FAILED',
// };

const initialState = {
    payments: []
};
// export const paymentsActionCreators = {
//     getPayments: (userId, from, to) => ({
//         type: actionTypes.getPaymentsType,
//         userId,
//         from,
//         to
//     }),
//     addPayment: (userId, data) => ({
//         type: actionTypes.addPaymentSubmitType,
//         userId,
//         data
//     }),
//     cancelPayment: (userId, paymentId) => ({
//         type: actionTypes.cancelPaymentType,
//         userId,
//         paymentId
//     }),
// };

// export const paymentsReducer = (state, action) => {
//     state = state || initialState;
//     // console.log(action.type);
//     switch (action.type) {
//         case actionTypes.getPaymentsSucceededType:
//             return {
//                 ...state,
//                 isLoaded: true,
//                 payments: action.payments
//             };
//         case actionTypes.getPaymentsFailedType:
//             return {
//                 ...state,
//                 // isLoaded: false,
//                 error: action.payload
//             };
//         case actionTypes.addPaymentSucceededType:
//             return {
//                 ...state,
//                 isLoaded: false,
//                 newPaymentId: action.newPaymentId
//             };
//         case actionTypes.addPaymentFailedType:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         case actionTypes.cancelPaymentSucceededType:
//             return {
//                 ...state,
//                 isLoaded: false
//             };
//         case actionTypes.cancelPaymentFailedType:
//             return {
//                 ...state,
//                 error: action.payload
//                 // isLoaded: false
//             };
//         default :
//             return state;
//     }
// };

