import React from "react"

export const GroupPageProfile = (props) => (<div>
    <div>Имя: {props.groupById.name}</div>
    <div>Цена за занятие: {props.groupById.cost}</div>
    <div>Продолжительность занятия: {props.groupById.duration}</div>
</div>);