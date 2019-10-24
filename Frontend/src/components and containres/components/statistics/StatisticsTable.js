import React from "react"


export const StatisticsTable = props => {
    console.log(props);
    return (<div>
        <table className="table table-responsive-sm table-striped table-info">
            <thead>
            <tr>
                <th>Группа</th>
                <th>Кол-во человек</th>
                <th>Кол-во посещений</th>
                <th>Посещаемость, %</th>
                <th>Ожид. доход</th>
            </tr>
            </thead>
            <tbody>
            {renderTableBody(props)}
            </tbody>
        </table>
    </div>)
};


function renderTableBody(props) {
    let res = [];
    props.groups.forEach(group => {
        // console.log(group);
        res.push(<tr>
            <td>{group.name}</td>
            <td>{group.peopleAmount}</td>
            <td>{group.visitsAmount}</td>
            <td>{group.attendancePercentage}</td>
            <td>{group.expectedIncome}</td>
        </tr>)
    });
    return res
}