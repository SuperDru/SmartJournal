import React, {Component} from 'react';
import {Alert} from 'reactstrap';

class AlertError extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            errorMsg: null
        };
        this.toggle = this.toggle.bind(this);
    }

    // getErrorMessage(error) {
    //     console.log(error);
    //     switch (error.data.errorCode) {
    //         case 1000:
    //             return "Поле 'Email' обязательно!";
    //         case 3001:
    //             return "Пользователь с таким 'Email' уже существует!";
    //         case 3002:
    //             return "Пользователь с таким номером телефона уже существует!"
    //     }
    //     return "error"
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isOpen !== prevState.isOpen) {
            this.props.alertCallback(this.state.isOpen)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isOpen: nextProps.isOpen,
            errorMsg: nextProps.isOpen ? nextProps.error.data.message : null
            // nextProps.isOpen ? this.getErrorMessage(nextProps.error) : null
        })
    }

    toggle() {
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
    }

    render() {
        return (
            <Alert color="danger" isOpen={this.state.isOpen} toggle={this.toggle}>
                <p>{this.state.errorMsg}</p>
            </Alert>
        )
    }
}

export default AlertError;