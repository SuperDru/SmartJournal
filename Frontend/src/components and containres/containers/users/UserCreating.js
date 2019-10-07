import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {UserCreatingInputs} from "../../components/users/UserCreatingInputs";
import UserCreatingForm from "../../components/users/UserCreatingForm";

class UserCreating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            patronymic: null,
            email: null,
            phoneNumber: null
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSaveUser() {
        this.props.createUserSubmit(this.state);
        this.props.history.goBack();
    }

    handleChange(e) {
        // console.log(e.target.id);
        switch (e.target.id) {
            case "userName":
                this.setState({name: e.target.value});
                break;
            case 'userSurname':
                this.setState({surname: e.target.value});
                break;
            case "userPatronymic":
                this.setState({patronymic: e.target.value});
                break;
            case "email-input":
                this.setState({email: e.target.value});
                break;
            case "tel-input":
                this.setState({phoneNumber: e.target.value});
                break;
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <h4>Создание профиля студента</h4>
                {/*<UserCreatingForm/>*/}
                <UserCreatingInputs handler={this.handleChange}/>
                <div className="container-fluid">
                    <div className="form-group row col-8">
                        <button
                            className='btn btn-success'
                            onClick={this.onSaveUser}>Сохранить
                        </button>
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