import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {connectRouter, routerMiddleware} from "connected-react-router";
import {scheduleReducer} from "./redux/schedule/reducer";
import {groupReducer} from "./redux/groups/reducer";
import {userReducer} from "./redux/users/reducer";
import {paymentsReducer} from "./redux/payments/reducer";
import {attendanceReducer} from "./redux/attendance/reducer";
import {statisticsReducer} from "./redux/statistics/reducer";
import {accountHistoryReducer} from "./redux/account history/reducer";
import rootSaga from '../sagas/root-saga'

export default function configureStore(history, initialState) {
    const reducers = {
        group: groupReducer,
        schedule: scheduleReducer,
        user: userReducer,
        attendance: attendanceReducer,
        payments: paymentsReducer,
        statistics: statisticsReducer,
        accountHistory: accountHistoryReducer
    };

    const sagaMiddleware = createSagaMiddleware();

    const middleware = [
        routerMiddleware(history),
        sagaMiddleware
    ];

    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development'; //env????
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    sagaMiddleware.run(rootSaga);

    return store;
}
