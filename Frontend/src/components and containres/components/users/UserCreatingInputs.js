import React, {Component} from "react"
import "../../../css/userCreating.css"


class UserCreatingInputs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userById ? this.props.userById.name : null,
            // name: null,
            surname: this.props.userById ? this.props.userById.surname : null,
            patronymic: this.props.userById ? this.props.userById.patronymic : null,
            email: this.props.userById ? this.props.userById.email : null,
            phoneNumber: this.props.userById ? this.props.userById.phoneNumber : null,
            // surname: null,
            // patronymic: null,
            // email: null,
            // phoneNumber: null,
            nameError: this.props.userById.name ?
                this.validateName(this.props.userById.name) : "Это поле обязательно",
            surnameError: this.props.userById.surname ?
                this.validateName(this.props.userById.surname) : "Это поле обязательно",
            patronymicError: this.props.userById.patronymic ?
                this.validateName(this.props.userById.patronymic) : "Это поле обязательно",
            phoneNumberError: this.props.userById.phoneNumber ?
                this.validatePhoneNumber(this.props.userById.phoneNumber) : "Это поле обязательно",
            emailError: this.props.userById.email ?
                this.validateEmail(this.props.userById.email) : "Это поле обязательно",
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("receive props");
        // console.log(nextProps);
        // console.log(nextProps.userById !== this.props.userById);
        if (nextProps.userById !== this.props.userById) {
            this.setState({
                name: nextProps.userById.name,
                surname: nextProps.userById.surname,
                patronymic: nextProps.userById.patronymic,
                email: nextProps.userById.email,
                phoneNumber: nextProps.userById.phoneNumber,
                nameError: this.validateName(nextProps.userById.name),
                surnameError: this.validateName(nextProps.userById.surname),
                patronymicError: this.validateName(nextProps.userById.patronymic),
                phoneNumberError: this.validatePhoneNumber(nextProps.userById.phoneNumber),
                emailError: this.validateEmail(nextProps.userById.email),
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.surname !== prevState.surname
            || this.state.patronymic !== prevState.patronymic
            || this.state.email !== prevState.email
            || this.state.phoneNumber !== prevState.phoneNumber) {
            this.props.getUserProfileCallback(Object.assign({}, this.state))
        }
    }

    validateName(value) {
        if (!value) {
            return "Это поле обязательно"
        }
        return !new RegExp(/^[A-ZА-Я][a-zа-я]+/).test(value) ?
            "Неверный ввод"
            : "";
    }

    validatePhoneNumber(value) {
        // console.log(value);
        if (!value) {
            return "Это поле обязательно"
        }
        return !new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/).test(value) ?
            "Неверный ввод"
            : "";
    }

    validateEmail(value) {
        if (!value) {
            return "Это поле обязательно"
        }
        return !new RegExp(/.+@.+\..+/i).test(value) ?
            "Неверный ввод"
            : "";
    }

    handleInput(e) {
        switch (e.target.id) {
            case "userName":
                this.setState({name: e.target.value, nameError: this.validateName(e.target.value)});
                break;
            case 'userSurname':
                this.setState({surname: e.target.value, surnameError: this.validateName(e.target.value)});
                break;
            case "userPatronymic":
                this.setState({patronymic: e.target.value, patronymicError: this.validateName(e.target.value)});
                break;
            case "email-input":
                this.setState({email: e.target.value, emailError: this.validateEmail(e.target.value)});
                break;
            case "tel-input":
                this.setState({
                    phoneNumber: e.target.value,
                    phoneNumberError: this.validatePhoneNumber(e.target.value)
                });
                break;
        }
    }

    render() {
        // console.log(this.state);
        // console.log(this.props);
        return (<div className="container-fluid">
            <div className="create-user">
                <form>
                    <div className="form-group row col">
                        <label htmlFor='userName' className="col-xs-2 col-form-label">Имя</label>
                        <input className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.nameError)}
                               type="text"
                               placeholder="Введите имя"
                               id='userName'
                               onInput={this.handleInput}
                               value={this.state.name}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.nameError}</div>
                        </div>
                    </div>
                    <div className="form-group row col">
                        <label htmlFor='userSurname' className="col-xs-2 col-form-label">Фамилия</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.surnameError)}
                            type="text"
                            placeholder="Введите фамилию"
                            id='userSurname'
                            onInput={this.handleInput}
                            value={this.state.surname}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.surnameError}</div>
                        </div>
                    </div>
                    <div className="form-group row col">
                        <label htmlFor='userPatronymic' className="col-xs-2 col-form-label">Отчество</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.patronymicError)}
                            type="text"
                            placeholder="Введите отчество"
                            id='userPatronymic'
                            onInput={this.handleInput}
                            value={this.state.patronymic}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.patronymicError}</div>
                        </div>
                    </div>
                    <div className="form-group row col">
                        <label htmlFor="tel-input" className="col-xs-2 col-form-label ">Номер
                            телефона</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.phoneNumberError)}
                            type="tel"
                            placeholder="1-(555)-555-5555"
                            id="tel-input"
                            onInput={this.handleInput}
                            value={this.state.phoneNumber}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.phoneNumberError}</div>
                        </div>
                    </div>
                    <div className="form-group row col">
                        <label htmlFor="email-input" className="col-xs-2 col-form-label">Email</label>
                        <input className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.emailError)}
                               type="email"
                               placeholder="ivanov.ii@example.com"
                               id="email-input"
                               onInput={this.handleInput}
                               value={this.state.email}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.emailError}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}

export default UserCreatingInputs;

function getClassNameByError(error) {
    return error ? "is-invalid" : "is-valid"
}