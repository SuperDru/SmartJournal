import {actionTypes} from "./actionTypes";

export const scheduleActionCreators = {
    getSchedule: (groupId, from, to) => ({
        type: actionTypes.getScheduleType,
        groupId, from, to
    }),
    editSchedule: () => ({
        type: actionTypes.editScheduleType,
    }),
    saveSchedule: (groupId, data) => ({
        // type: editScheduleSubmitType,
        type: actionTypes.editScheduleSubmitType,
        groupId,
        data
    }),
    cancelEditSchedule:()=>({
        type: actionTypes.editScheduleFailedType,
    })
};