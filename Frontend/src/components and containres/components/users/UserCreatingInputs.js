import React from "react"
import "../../../css/userCreating.css"

export const UserCreatingInputs = (props) => (<div className="container-fluid">
    <div className="create-user">
        <form>
            <div className="form-group row col-md-8">
                <label htmlFor='userName' className="col-xs-2 col-form-label">Имя</label>
                <input className="form-control col-xs-10 m-0"
                       type="text"
                       placeholder="Введите имя"
                       id='userName'
                       onChange={props.handler}
                       defaultValue={props.userById ? props.userById.name : null}
                />
            </div>
            <div className="form-group row col-md-8">
                <label htmlFor='userSurname' className="col-xs-2 col-form-label">Фамилия</label>
                <input className="form-control col-xs-10 m-0"
                       type="text"
                       placeholder="Введите фамилию"
                       id='userSurname'
                       onChange={props.handler}
                       defaultValue={props.userById ? props.userById.surname : null}
                />
            </div>
            <div className="form-group row col-md-8">
                <label htmlFor='userPatronymic' className="col-xs-2 col-form-label">Отчество</label>
                <input className="form-control col-xs-10 m-0"
                       type="text"
                       placeholder="Введите отчество"
                       id='userPatronymic'
                       onChange={props.handler}
                       defaultValue={props.userById ? props.userById.patronymic : null}
                />
            </div>
            <div className="form-group row col-md-8">
                <label htmlFor="tel-input" className="col-xs-2 col-form-label ">Номер
                    телефона</label>
                <input className="form-control col-xs-10 m-0"
                       type="tel"
                       placeholder="1-(555)-555-5555"
                       id="tel-input"
                       onChange={props.handler}
                       defaultValue={props.userById ? props.userById.phoneNumber : null}
                />
            </div>
            <div className="form-group row col-md-8">
                <label htmlFor="email-input" className="col-xs-2 col-form-label">Email</label>
                <input className="form-control col-xs-10 m-0"
                       type="email"
                       placeholder="ivanov.ii@example.com"
                       id="email-input"
                       onChange={props.handler}
                       defaultValue={props.userById ? props.userById.email : null}
                />
            </div>
        </form>
    </div>
</div>);