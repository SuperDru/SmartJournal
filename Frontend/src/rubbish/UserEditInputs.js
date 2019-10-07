import React from "react"


export const UserEditInputs = (props) => (<div>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                <div className="col-xs-10">
                    <input className="form-control"
                           type="text"
                           onChange={props.handler}
                           defaultValue={props.userById.name}
                           placeholder="Введите имя"
                           id='editedUserName'
                    />
                </div>
            </div>
        </form>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Фамилия</label>
                <div className="col-xs-10">
                    <input className="form-control"
                           type="text"
                           onChange={props.handler}
                           defaultValue={props.userById.surname}
                           placeholder="Введите фамилию"
                           id='editedUserSurname'
                    />
                </div>
            </div>
        </form>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Отчество</label>
                <div className="col-xs-10">
                    <input className="form-control"
                           type="text"
                           onChange={props.handler}
                           defaultValue={props.userById.patronymic}
                           placeholder="Введите отчество"
                           id='editedUserPatronymic'
                    />
                </div>
            </div>
        </form>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="example-email-input" className="col-xs-2 col-form-label">Email</label>
                <div className="col-xs-10">
                    <input className="form-control"
                           type="email"
                           onChange={props.handler}
                           defaultValue={props.userById.email}
                           placeholder="ivanov.ii@example.com"
                           id="editedEmail-input"
                    />
                </div>
            </div>
        </form>
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Номер
                    телефона</label>
                <div className="col-xs-10">
                    <input className="form-control"
                           type="tel"
                           onChange={props.handler}
                           defaultValue={props.userById.phoneNumber}
                           placeholder={"1-(555)-555-5555"}
                           id="editedTel-input"
                    />
                </div>
            </div>
        </form>
    </div>);