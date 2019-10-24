import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import UserCreatingInputs from "../../components/users/UserCreatingInputs";
import AlertError from "../../components/alerts/Alert";

// import UserCreatingForm from "../../components/users/UserCreatingForm";

class UserCreating extends Component {

    constructor(props) {
        super(props);
        let savedUserDataFromSessionStorage = JSON.parse(sessionStorage.getItem("savedUserData"));
        console.log(savedUserDataFromSessionStorage);
        this.state = {
            name: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.name : null,
            surname: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.surname : null,
            patronymic: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.patronymic : null,
            email: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.email : null,
            phoneNumber: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.phoneNumber : null,
            nameError: null,
            surnameError: null,
            patronymicError: null,
            phoneNumberError: null,
            emailError: null,
            isAlertOpen: false
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.getUserProfileCallback = this.getUserProfileCallback.bind(this);
        this.alertCallback = this.alertCallback.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.surname !== prevState.surname
            || this.state.patronymic !== prevState.patronymic
            || this.state.email !== prevState.email
            || this.state.phoneNumber !== prevState.phoneNumber) {
            // console.log("update body");
            sessionStorage.setItem("savedUserData", JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                patronymic: this.state.patronymic,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
            }))
        }
    }

    alertCallback(isOpen) {
        this.setState({isAlertOpen: isOpen})
    }

    onSaveUser() {
        // try {
        this.props.createUserSubmit(this.state);
        // console.log(this.props);
        // if (!this.props.error) {
        //     // this.props.history.goBack();
        // } else {
        //     console.log(this.props.error)
        // }
        // } catch (e) {
        //     console.log("error", this.props, e);
        // }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        // console.log("receive props");
        // console.log(nextProps.newUser);
        if (nextProps.error !== this.props.error) {
            this.setState({isAlertOpen: true})
        } else if (nextProps.newUser) {
            console.log("else");
            this.props.history.goBack();
        }
    }

    getUserProfileCallback(userData) {
        this.setState({
            name: userData.name,
            surname: userData.surname,
            patronymic: userData.patronymic,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            // nameError: userData.nameError,
            // surnameError: userData.surnameError,
            // patronymicError: userData.patronymicError,
            // phoneNumberError: userData.phoneNumberError,
            // emailError: userData.emailError,
        })
    }

    render() {
        // console.log(this.state);
        // console.log("ls", sessionStorage.getItem("savedUserData"));
        // console.log("ls", sessionStorage);
        // console.log("state:", this.state);
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="user-creating col-sm-6">
                        <h4 className="user-creating__header col-sm">Создание профиля студента</h4>
                        <hr/>
                        <UserCreatingInputs getUserProfileCallback={this.getUserProfileCallback} userById={{
                            name: this.state.name,
                            surname: this.state.surname,
                            patronymic: this.state.patronymic,
                            email: this.state.email,
                            phoneNumber: this.state.phoneNumber,
                        }}/>
                        <AlertError isOpen={this.state.isAlertOpen} error={this.props.error}
                                    alertCallback={this.alertCallback}/>
                        <hr/>
                        <div className="container-fluid">
                            <div className="form-group row col-8">
                                <button
                                    className='btn btn-success'
                                    onClick={this.onSaveUser}
                                    // disabled={this.state.nameError
                                    // || this.state.surnameError
                                    // || this.state.patronymicError
                                    // || this.state.phoneNumberError
                                    // || this.state.emailError}
                                >
                                    {/*<span className="oi oi-file"/>*/}
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UserCreating);