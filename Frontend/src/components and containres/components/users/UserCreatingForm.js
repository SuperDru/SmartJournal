import React, {Component} from "react";


class UserCreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: "Это поле обязательно",
            phoneNumber: "",
            phoneNumberError: "Это поле обязательно",
            emailError: "Это поле обязательно",
            email: ""
        };
        this.onUserNameBlur = this.onUserNameBlur.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.onPhoneNumberBlur = this.onPhoneNumberBlur.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);
    }

    validateUserName(value) {
        return !new RegExp(/[A-Zа-я][a-zа-я]+/).test(value) ?
            "Неверный ввод"
            : "";
    }

    validatePhoneNumber(value) {
        return !new RegExp(/^8[0-9]{10}/).test(value) ?
            "Неверный ввод"
            : "";
    }

    validateEmail(value) {
        return !new RegExp(/.+@.+\..+/i).test(value) ?
            "Неверный ввод"
            : "";
    }

    onUserNameBlur() {
        console.log("blur");
        const {username} = this.state;
        const usernameError = this.validateUserName(username);
        this.setState({usernameError});
    };

    onUserNameChange(e) {
        this.setState({username: e.target.value});
    }

    onPhoneNumberChange(e) {
        this.setState({phoneNumber: e.target.value})
    }

    onPhoneNumberBlur(e) {
        const {phoneNumber} = this.state;
        const phoneNumberError = this.validatePhoneNumber(phoneNumber);
        this.setState({phoneNumberError})
    }

    onEmailChange(e) {
        this.setState({email: e.target.value})
    }

    onEmailBlur(e) {
        const emailError = this.validateEmail(this.state.email);
        this.setState({emailError})
    }

    render() {
        const {username, usernameError, phoneNumberError, emailError} = this.state;
        const userClassName = usernameError ? "is-invalid" : "is-valid";
        const emailClassName = emailError ? "is-invalid" : "is-valid";
        console.log(this.state);
        // console.log(Boolean(userClassName));
        return (<div>
            <div className="form-group">
                <label htmlFor="firstName">First name:</label>
                <input
                    className={"form-control col-md-2 " + userClassName}
                    // className="form-control col-md-2 is-valid"
                    type="text"
                    id="firstName"
                    onChange={this.onUserNameChange}
                    onBlur={this.onUserNameBlur}
                />
                <div className="invalid-feedback valid-feedback">
                    {usernameError && <div>{usernameError}</div>}
                </div>
            </div>
            <div>
                Phone number
                <input
                    className="form-control col-md-2"
                    type="tel"
                    name="phoneNumber"
                    onChange={this.onPhoneNumberChange}
                    onBlur={this.onPhoneNumberBlur}
                />
                <label>
                    {phoneNumberError && <div>{phoneNumberError}</div>}
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    className={"form-control col-md-2 " + emailClassName}
                    // className="form-control col-md-2 is-valid"
                    type="email"
                    id="email"
                    onChange={this.onEmailChange}
                    onBlur={this.onEmailBlur}
                />
                <div className="invalid-feedback valid-feedback">
                    {emailError && <div>{emailError}</div>}
                </div>
            </div>
        </div>)
    }
}

export default UserCreatingForm;