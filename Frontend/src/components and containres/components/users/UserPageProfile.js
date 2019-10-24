import React from "react"
import {Link} from "react-router-dom";

export const UserPageProfile = (props) => {
    return (<div className="m-2">
        <div className="row">
            <div className="col-sm-10">
                <p className="d-inline-block font-weight-light col-sm-4">Имя:</p>
                <p className="font-italic ml-2 d-inline-block col-sm-6">{props.userById.name}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-10">
                <p className="d-inline-block font-weight-light col-sm-4">Фамилия:</p>
                <p className="font-italic ml-2 d-inline-block col-sm-6">{props.userById.surname}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-10">
                <p className="d-inline-block font-weight-light col-sm-4">Отчество:</p>
                <p className="font-italic ml-2 d-inline-block col-sm-6">{props.userById.patronymic}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-10">
                <p className="d-inline-block font-weight-light col-sm-4">Номер телефона:</p>
                <p className="font-italic ml-2 d-inline-block col-sm-6">{props.userById.phoneNumber}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-10">
                <p className="d-inline-block font-weight-light col-sm-4">Email:</p>
                <p className="font-italic ml-2 d-inline-block col-sm-6">{props.userById.email}</p>
            </div>
        </div>
    </div>)
};