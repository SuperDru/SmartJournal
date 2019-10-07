import React from "react"


export const StatisticsTable = props => {
    return (<div>
        <table className="table table-responsive-sm table-striped table-primary">
            <thead>
            <th>Группа</th>
            <th>Кол-во человек</th>
            <th>Кол-во почещений</th>
            <th>Посещаемость, %</th>
            <th>Ожид. доход</th>
            </thead>
            <tbody>
            <tr>
                <td>{props.groupById.name}</td>
                <td>{props.statistics.peopleAmount}</td>
                <td>{props.statistics.visitsAmoun}</td>
                <td>{props.statistics.attendancePercentage}</td>
                <td>{props.statistics.expectedIncome}</td>
            </tr>
            </tbody>
        </table>
    </div>)
}