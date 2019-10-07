import React, {Component} from "react";


class UserCreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: "",
        };
        this.onUserNameBlur = this.onUserNameBlur.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
    }

    validateUserName(name) {
        return !new RegExp(/[A-Za-z]{3,}/).test(name) ?
            "The name must contain at least three letters. Numbers and special characters are not allowed."
            : "";
    }

    onUserNameBlur() {
        const {username} = this.state;
        const usernameError = this.validateUserName(username);
        this.setState({usernameError});
    };

    onUserNameChange(e) {
        this.setState({username: e.target.value});
    }

    render() {
        const {username, usernameError} = this.state;
        console.log(this.state);
        return (<div>
            <label>
                First name:
                <input
                    type="text"
                    name="firstName"
                    onChange={this.onUserNameChange}
                    onBlur={this.onUserNameBlur}
                />
                {usernameError && <div>{usernameError}</div>}
            </label>
        </div>)
    }
}

export default UserCreatingForm;