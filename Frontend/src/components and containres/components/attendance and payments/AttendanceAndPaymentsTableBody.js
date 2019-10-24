import React from "react"
import {AttendanceAndPaymentsTableBodySchedule} from "./AttendanceAndPaymentsTableBodySchedule";

export const AttendanceAndPaymentsTableBody = (props) => {
    console.log(props);
    return (props.usersFromGroup ?
        props.usersFromGroup.map(user => (
            <tr key={user.id}>
                <td>{user.name} {user.surname}</td>
                {AttendanceAndPaymentsTableBodySchedule(props, user.guid)}
                {/*<td>{user.dept}</td>*/}
                <td>{user.amount}</td>
                {/*<div className="table__button-add-payment">*/}
                <td>
                    <button className="btn btn-success btn-sm table__button-add-payment"
                            onClick={props.onAddPayment.bind(this, user.guid)}>
                        <span className="oi oi-dollar"/>
                        Пополнить счет
                    </button>
                </td>
                {/*</div>*/}
            </tr>
        )) : null)
};