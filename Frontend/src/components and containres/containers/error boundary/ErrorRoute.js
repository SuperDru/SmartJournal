import React, {Component} from "react"
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {ErrorPage} from "../../components/error boundary/ErrorPage";

class ErrorRoute extends Component {
    render() {
        return (<Route path="/error_page" component={ErrorPage}/>)
    }
}

export default connect(
    state => state
)(ErrorRoute)