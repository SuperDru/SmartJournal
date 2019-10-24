import React from "react"

export const GroupPageProfile = (props) => (<div className="m-2">
    <div className="row">
        <div className="col-sm-10">
            <p className="d-inline-block font-weight-light col-sm-4">Имя:</p>
            <p className="font-italic ml-2 d-inline-block col-sm-6">{props.groupById.name}</p>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-10">
            <p className="d-inline-block font-weight-light col-sm-4">Цена за занятие:</p>
            <p className="font-italic ml-2 d-inline-block col-sm-6">{props.groupById.cost} руб.</p>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-10">
            <p className="d-inline-block font-weight-light col-sm-4">Продолжительность занятия:</p>
            <p className="font-italic ml-2 d-inline-block col-sm-6">{props.groupById.duration} мин.</p>
        </div>
    </div>
</div>);