import {call, put, takeLatest, all} from "redux-saga/effects";
//action types
import {actionTypes} from "../../store/redux/payments/actionTypes";
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";
//url
// const url = "http://localhost:8200";


export function* getPaymentsSaga() {
    yield all([getPayments(), cancelPayment(), addPayment()])
}

function* getPayments() {
    yield takeLatest(actionTypes.getPaymentsType, callGetPayments)
}

function* callGetPayments({userId, from, to}) {
    try {
        console.log('saga-get-payments');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // const payments = yield call(() => fetch(url + '/payments/' + userId +
        //     "?from=" + from + "&to=" + to,
        //     {
        //         method: 'GET',
        //         headers: headers,
        //     }).then(response => response.json())
        //     .catch(error => console.error(error)));
        const response = yield call(httpRequest, "get", url + '/payments/' + userId +
            "?from=" + from + "&to=" + to, headers);
        yield put({type: actionTypes.getPaymentsSucceededType, payments: response.data});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getPaymentsFailedType, error});
    }
}

function* addPayment() {
    yield takeLatest(actionTypes.addPaymentSubmitType, callAddPayment);
}

function* callAddPayment({userId, data}) {
    try {
        console.log("saga-add-payment");
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // const newPaymentId = yield call(() => fetch(url + '/payments/' + userId,
        //     {
        //         method: 'POST',
        //         headers: headers,
        //         body: JSON.stringify(data)
        //     }).then(response => response.json())
        //     .catch(error => console.log(error)));
        const response = yield call(httpRequest, "post", url + '/payments/' + userId, headers, data);
        yield put({type: actionTypes.addPaymentSucceededType, newPaymentId: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.addPaymentFailedType, error})
    }
}

function* cancelPayment() {
    yield takeLatest(actionTypes.cancelPaymentType, callCancelPayment)
}

function* callCancelPayment({userId, paymentId}) {
    try {
        let headers = new Headers();
        console.log("saga-cancel-payment");
        headers.append('Content-Type', "application/json");
        // yield call(() => fetch(url + '/payments/' + userId + '/' + paymentId,
        //     {
        //         method: 'DELETE',
        //         headers: headers
        //     }).catch(error => console.log(error)));
        yield call(httpRequest, "delete", url + '/payments/' + userId + '/' + paymentId, headers);
        yield put({type: actionTypes.cancelPaymentSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.cancelPaymentFailedType})
    }
}

