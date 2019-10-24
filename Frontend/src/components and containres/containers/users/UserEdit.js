import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import UserCreatingInputs from "../../components/users/UserCreatingInputs";

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            patronymic: null,
            email: null,
            phoneNumber: null
        };
        this.onSaveEditUser = this.onSaveEditUser.bind(this);
        this.getUserProfileCallback = this.getUserProfileCallback.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.userId);
        this.props.getUserById(this.props.userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("did update");
        // console.log(this.props.isLoaded);
        // console.log(prevProps.isLoaded);
        // if (this.props.isLoaded !== prevProps.isLoaded) {
        if (this.props.userById !== prevProps.userById) {
            this.setState({
                name: this.props.userById.name,
                surname: this.props.userById.surname,
                patronymic: this.props.userById.patronymic,
                email: this.props.userById.email,
                phoneNumber: this.props.userById.phoneNumber,
            })
        }
    }

    onSaveEditUser() {
        console.log("this.state OK!", this.state);
        this.props.editUserSubmit(this.props.userId, this.state);
        this.props.history.goBack();
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
        console.log("this.state", this.state);
        console.log("this.props", this.props);
        return (
            <div className="container-fluid">
                <div className="row justify-content-sm-between">
                    <div className="user-creating col-sm-6">
                        <h4 className="user-creating__header col-sm">Редактирование профиля студента</h4>
                        <hr/>
                        <UserCreatingInputs getUserProfileCallback={this.getUserProfileCallback}
                                            userById={{
                                                name: this.state.name,
                                                surname: this.state.surname,
                                                patronymic: this.state.patronymic,
                                                email: this.state.email,
                                                phoneNumber: this.state.phoneNumber,
                                            }}/>
                        <hr/>
                        <div className="container">
                            <div className="form-group row col-8">
                                <button className='btn btn-success' onClick={this.onSaveEditUser}>
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
)(UserEdit)