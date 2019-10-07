import React from "react"
import {MonthlyScheduleTableBody} from "./MonthlyScheduleTableBody";

export const MonthlySchedule = (props) => (
    <div className="schedule__true-schedule">
        <table className='table table-responsive-sm table-bordered'>
            <thead>
            <tr>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
                <th>Вс</th>
            </tr>
            </thead>
            <tbody>
            {MonthlyScheduleTableBody(props)}
            </tbody>
        </table>
    </div>
);