import React from "react"
import {Link} from "react-router-dom";

export const UserPageProfile = (props) => {
    return (<div>
        <div>Имя: {props.userById.name}</div>
        <div>Фамилия: {props.userById.surname}</div>
        <div>Отчество: {props.userById.patronymic}</div>
        <div>Номер телефона: {props.userById.phoneNumber}</div>
        <div>Email : {props.userById.email}</div>
    </div>)
};