import React from "react"

export const AttendanceAndPaymentsTableHead=(props)=> {
    let result = [];
    props.props.scheduleOfGroup.forEach((value, key) => {
        result.push(<th className="cell" onClick={props.onClickHead.bind(this, key)}>{key}</th>)
    });
    return (<tr>
        <th className="table__head_student">Студент</th>
        {result}
        <th>Долг</th>
        <th>Счет</th>
        <th>Действие</th>
    </tr>)
};