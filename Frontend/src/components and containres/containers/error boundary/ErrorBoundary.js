import React, {Component} from "react";
// import {Redirect, Route} from "react-router-dom";
import {ErrorPage} from "../../components/error boundary/ErrorPage";
import {connect} from "react-redux";
// import ModalError from "../../components/modals/ModalError";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            // serverError: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("error boundary receive props", nextProps);
        if (nextProps.group.error) {
            this.setState({
                hasError: true,
                error: nextProps.group.error,
                // isModalOpen: true
            })
        } else if (nextProps.user.error) {
            this.setState({
                hasError: true,
                error: nextProps.user.error,
                // isModalOpen: true
            })
        } else if (nextProps.schedule.error) {
            this.setState({
                hasError: true,
                error: nextProps.schedule.error,
                // isModalOpen: true
            })
        } else if (nextProps.attendance.error) {
            this.setState({
                hasError: true,
                error: nextProps.attendance.error,
                // isModalOpen: true
            })
        } else if (nextProps.payments.error) {
            this.setState({
                hasError: true,
                error: nextProps.payments.error,
                // isModalOpen: true
            })
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            // isModalOpen: true
        })
    }

//                {/*<div>Упс, что-то пошло не так :(</div> */}
//{/*<Redirect to="/error_page"/>*/}

    // toggleCallback(isOpen) {
    //     this.setState({isModalOpen: isOpen})
    // }

    render() {
        console.log("props", this.props);
        console.log("error boundary", console.log(this.state));
        return (
            <div>{
                this.state.hasError ?
                    <div>
                        <ErrorPage error={this.state.error}/>
                    </div>
                    // :
                    // this.state.serverError ? <div className="alert alert-danger" role="alert">
                    //     This is a danger alert—check it out!
                    // </div>
                    //                    <ModalError isOpen={this.state.isModalOpen}/>
                    : this.props.children}</div>)
        // </Route>
        // <Route path="/error_page">)
    }
}


export default connect(
    state => state
)(ErrorBoundary);