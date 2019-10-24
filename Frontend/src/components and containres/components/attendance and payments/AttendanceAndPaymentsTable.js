import React from "react"
import {AttendanceAndPaymentsTableHead} from "./AttendanceAndPaymentsTableHead";
import {AttendanceAndPaymentsTableBody} from "./AttendanceAndPaymentsTableBody";

export const AttendanceAndPaymentsTable = (props) => (<div>
    <table className='table table-hover table-bordered table-responsive'>
        <thead>
        {AttendanceAndPaymentsTableHead(props)}
        </thead>
        <tbody>
        {AttendanceAndPaymentsTableBody(props)}
        </tbody>
    </table>
</div>);