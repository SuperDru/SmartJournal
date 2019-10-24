import React from "react"

export const GroupWeekSchedule = (props) => (<div className="m-2">
    <table className='table table-striped table-bordered'>
        <thead>
        <tr>
            <th>ПН</th>
            <th>ВТ</th>
            <th>СР</th>
            <th>ЧТ</th>
            <th>ПТ</th>
            <th>СБ</th>
            <th>ВС</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            {renderSchedule(props.groupById)}
        </tr>
        </tbody>
    </table>
</div>);


function renderSchedule(props) {
    let res = [];
    for (let i = 0; i < 7; i++) {
        res.push(<td key={i}
                     className={props.days[i] ? "table-info cell" : "table-default cell"}>
            <p>{props.startTimes[i]}</p>
        </td>)
    }
    return res;
}