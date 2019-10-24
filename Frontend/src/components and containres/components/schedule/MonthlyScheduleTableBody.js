import React from "react"

export const MonthlyScheduleTableBody = (props) => {
    // console.log("props", props);
    let weekSize = 7;
    let tableBody = [];
    let week = [];
    let beginOfWeek = props.props.selectedMonth.getDay() || 7;
    let daysInPreviousMonth = props.props.previousMonth.daysInMonth() - beginOfWeek + 1;
    let endOfTable = 42;
    let daysInNextMonth = 1;
    let day = 0;
    // console.log(props.props.newSchedule)
    if (props.props.editedScheduleOfGroup) {
        for (let i = 1; i < endOfTable + 1; i++) {
            if (i < beginOfWeek) {
                week.push(<td className="cell opacity-cell table-secondary">
                    <div className="text-right">{++daysInPreviousMonth}</div>
                    <small>{null}</small>
                </td>);
            } else {
                let className = props.props.scheduleOfGroup.has(day + 1) ? "table-info" : "table-light";
                week.push(day < props.props.selectedMonth.daysInMonth() ?
                    <td className={className + " cell"} onClick={props.clickHandler.bind(this, day + 1)}
                        id={day + 1 + "cell"}>
                        <div className="text-right">{++day}</div>
                        <div className="text-center">
                            <small className="font-weight-bold">{props.props.editedScheduleOfGroup.has(day) ? props.props.editedScheduleOfGroup.get(day)
                                // : props.props.newSchedule.has(day) ? props.props.newSchedule.get(day).startTime
                                : null}</small>
                        </div>
                    </td> :
                    <td className="opacity-cell table-secondary cell">
                        <div className="text-right">{daysInNextMonth++}</div>
                        <small>{null}</small>
                    </td>);
                if (i % weekSize === 0 || i === endOfTable) {
                    tableBody.push(<tr>{week}</tr>);
                    week = [];
                }
            }
        }
    }
    return tableBody;
};