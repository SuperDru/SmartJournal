import React from 'react';

export const UserPaymentHistory = (props) => {
    console.log(props);
    return (
        <div>
            <h5>История платежей студента</h5>
            <table className="table table-bordered table-bordered table-hover">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {props.payments.map(payment => (
                    <tr>
                        <td>{new Date(payment.payday).toString()}</td>
                        <td>{payment.amount}</td>
                        <div>
                            <button className="btn btn-danger"
                                    onClick={props.onDelete.bind(this, payment.id)}>
                                Удалить
                            </button>
                        </div>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
