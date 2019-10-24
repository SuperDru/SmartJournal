import React from 'react';
import * as functions from "../../../functions/index"

export const UserPaymentHistory = (props) => {
    console.log(props);
    return (
        <div>
            {/*<h5>История платежей студента</h5>*/}
            {props.accountHistory.length ?
                <div>
                    <table className="table table-bordered table-bordered table-hover table-responsive-sm">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Тип операции</th>
                            <th>Сумма операции</th>
                            <th>Счет</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.accountHistory.map(payment => (
                            <tr>
                                <td>{new Date(payment.performedAt).toUTCString()}</td>
                                <td>{getTypeOperationString(payment.type)}</td>
                                <td>{payment.diffAmount}</td>
                                <td>{payment.newAmount}</td>
                                <td>
                                    {props.payments.has(payment.paymentId) ?
                                        <button className="btn btn-outline-danger"
                                                onClick={props.onDelete.bind(this, payment.paymentId)}>
                                            Отменить
                                        </button> : null}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="row justify-content-center m-3">
                        <button className="btn btn-outline-dark col-sm-4" onClick={props.getMoreHistory.bind(this)}>
                            Загрузить больше
                        </button>
                    </div>
                </div> : <div><p>Здесь будет отображаться история платежей</p></div>}
        </div>
    );
};


function getTypeOperationString(type) {
    switch (type) {
        case 0:
            return "Unknown";
        case 1:
            return "Внесение платежа";
        case 2:
            return "Отмена платежа";
        case 3:
            return "Увеличение долга в связи с изменением расписания или посещаемости";
        case 4:
            return "Уменьшение долга в связи с изменением расписания или посещаемости";
    }
}