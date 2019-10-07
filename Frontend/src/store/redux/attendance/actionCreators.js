// import {actionTypes} from "../../reducers/attendanceReducer";
import {actionTypes} from "./actionTypes";

export const attendanceActionCreators = {
    getAttendance: (groupId, from, to) => ({
        type: actionTypes.getAttendanceType,
        groupId, from, to
    }),
    editAttendance: () => ({
        type: actionTypes.editAttendanceType
    }),
    saveEditAttendance: (groupId, data) => ({
        type: actionTypes.editAttendanceSubmitType,
        groupId, data
    }),
    cancelEditAttendance: () => ({
        type: actionTypes.editAttendanceFailedType
    })
};