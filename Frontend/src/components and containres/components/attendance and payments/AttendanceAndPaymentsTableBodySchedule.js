import React from "react"


export const AttendanceAndPaymentsTableBodySchedule = (props, userId) => {
    let result = [];
    // console.log("tbody", props);
    if (props.isAttendanceEdit && props.props.attendance) {
        let attendanceOfUser = props.props.attendance.get(userId);
        props.props.scheduleOfGroup.forEach((value, key) => {
            let classname = "table-default";
            let content;
            if (attendanceOfUser.has(key)) {
                classname = "table-primary";
                content = "Б";
            } else if (key <= props.props.currentDate.getDate()
                && props.props.selectedMonth.getMonth() <= props.props.currentDate.getMonth()) {
                classname = "table-secondary";
                content = "Н";
            }
            result.push(<td className={classname}
                            onClick={props.onClickBody.bind(this, userId, key)}
                            id={userId + key + "cell"}>{content}</td>)
        });
        return result;
    }
    if (props.props.attendance) {
        let attendanceOfUser = props.props.attendance.get(userId);
        console.log("attendanceOfUser", attendanceOfUser);
        if (attendanceOfUser) {
            props.props.scheduleOfGroup.forEach((value, key) => {
                let classname = "table-default";
                let content;
                if (attendanceOfUser.has(key)) {
                    classname = attendanceOfUser.get(key) ? "table-success" : "table-danger";
                    content = "Б";
                } else if (key <= props.props.currentDate.getDate()
                    && props.props.selectedMonth.getMonth() <= props.props.currentDate.getMonth()) {
                    classname = "table-secondary";
                    content = "Н";
                }
                result.push(<td className={classname}
                                onClick={props.onClickBody.bind(this, userId, key)}
                                id={userId + key + "cell"}>{content}</td>)
            });
            return result;
        }
    }
    return result;
};