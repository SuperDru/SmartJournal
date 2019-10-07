import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components and containres/components/other/Layout';
import Schedule from "./components and containres/containers/schedule/Schedule";
import Groups from "./components and containres/containers/groups/GroupsRoute";
import Home from "./components and containres/components/other/Home";
import Users from "./components and containres/containers/users/UsersRoute";
import AttendanceAndPayments
    from "./components and containres/containers/attendance and payments/AttendanceAndPayments";
import ErrorBoundary from "./components and containres/containers/error boundary/ErrorBoundary";
// import {ErrorComponent} from "./components and containres/components/error boundary/Error"
import ErrorRoute from "./components and containres/containers/error boundary/ErrorRoute";
import Statistics from "./components and containres/containers/statistics/Statistics";

export default () => (
    <ErrorBoundary>
        <Layout>
            <Route exact path='/' component={Home}/>
            <Route path='/payment_management' component={AttendanceAndPayments}/>
            <Route path='/schedule' component={Schedule}/>
            <Route path='/groups' component={Groups}/>
            <Route path='/users' component={Users}/>
            <Route path='/statistics' component={Statistics}/>
            <Route exact path='/error_page' component={ErrorRoute}/>
        </Layout>
    </ErrorBoundary>
);
