import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Form from "../../components/other/Form";
import {scheduleActionCreators} from "../../../store/redux/schedule/actionCreators";
import "../../../css/AttendanceAndPayments.css"
import {attendanceActionCreators} from "../../../store/redux/attendance/actionCreators";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {EditSaveButtons} from "../../components/other/EditSaveButtons";
import * as functions from "../../../functions/index"
import {AttendanceAndPaymentsTable} from "../../components/attendance and payments/AttendanceAndPaymentsTable";
import ModalAddPayment from "../../components/modals/ModalAddPayment";


class AttendanceAndPayments extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date().getBeginOfMonth(),
            scheduleOfGroup: new Map(),
            newAttendance: new Map(),
            groupsMap: new Map(),
            currentDate: new Date(),
            attendance: new Map(),
            isPaymentModalOpen: false
        };
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.getSelectedGroupId = this.getSelectedGroupId.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.addPayment = this.addPayment.bind(this);
        this.clickAttendanceHeadHandler = this.clickAttendanceHeadHandler.bind(this);
        this.clickAttendanceHandler = this.clickAttendanceHandler.bind(this);
        this.paymentModalToggle = this.paymentModalToggle.bind(this);
        this.paymentModalCallback = this.paymentModalCallback.bind(this);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.selectedMonth
            || (this.state.selectedMonth !== prevState.selectedMonth) && this.state.selectedGroupId)
        // || (!this.props.schedule.isLoaded && this.state.selectedMonth && this.state.selectedGroupId))
        {
            console.log("did-update");
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            // console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
            this.props.getUsersFromGroup(this.state.selectedGroupId);
            this.props.getAttendance(this.state.selectedGroupId, from, to);
            if (this.props.attendance.isEdit) {
                this.props.cancelEditAttendance();
            }
        }
        if (this.props.schedule.schedule !== prevProps.schedule.schedule) {
            let scheduleOfGroup = new Map();
            this.props.schedule.schedule.map((day) => {
                scheduleOfGroup.set(new Date(day.date).getDate(), day.startTime);
            });
            this.setState({
                scheduleOfGroup: scheduleOfGroup,
            });
        }
        // console.log("buttons", this.props.attendance.attendance);
        if (this.props.attendance.attendance !== prevProps.attendance.attendance
            && this.props.attendance.attendance) {
            let tempMap = new Map();
            let tempNewAttendance = new Map();
            this.props.attendance.attendance.forEach(el => {
                let attendance = new Map();
                el.attendance.forEach(value => {
                    attendance.set(new Date(value.date).getDate(), value.isPaid);
                });
                tempMap.set(el.userId, attendance);
                tempNewAttendance.set(el.userId, []);
            });
            this.setState({
                attendance: tempMap,
                newAttendance: tempNewAttendance
            });
        }
        if (this.props.attendance.isEdited && this.state.selectedGroupId) {
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            this.props.getAttendance(this.state.selectedGroupId, from, to);
            this.props.getUsersFromGroup(this.state.selectedGroupId);
        }
        if (this.props.group.groups !== prevProps.group.groups) {
            let tempGroupsMap = new Map();
            this.props.group.groups.forEach(value => {
                tempGroupsMap.set(value.guid, {
                    name: value.name,
                    days: value.days,
                    startTimes: value.startTimes,
                    duration: value.duration,
                    cost: value.cost
                })
            });
            this.setState({
                groupsMap: tempGroupsMap
            })
        }
        if (this.props.payments.newPaymentId !== prevProps.payments.newPaymentId) {
            this.props.getUsersFromGroup(this.state.selectedGroupId);
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            this.props.getAttendance(this.state.selectedGroupId, from, to);
        }
    }

    componentWillUnmount() {
        if (this.props.attendance.isEdit) {
            this.props.cancelEditAttendance();
        }
    }

    getSelectedDate(value) {
        this.setState({selectedMonth: new Date(value).getBeginOfMonth()});
    }

    getSelectedGroupId(value) {
        this.setState({selectedGroupId: value});
    }

    onEdit() {
        this.props.editAttendance();
    }

    onSave() {
        let data = [];
        console.log(this.state.newAttendance);
        this.state.newAttendance.forEach((value, key) => {
            data.push({userId: key, updatedAttendance: value});
        });
        // console.log(data);
        this.props.saveEditAttendance(this.state.selectedGroupId, data);
    }

    clickAttendanceHeadHandler(key, e) {
        if (this.props.attendance.isEdit) {
            let newClassname;
            let content;
            let isAttended;
            switch (e.target.className) {
                case "att_cell":
                    e.target.className = "cell_attended";
                    newClassname = "table-primary";
                    content = "Б";
                    isAttended = true;
                    break;
                case "cell_attended":
                    e.target.className = "att_cell";
                    // newClassname = "table-secondary";
                    newClassname = "table-default";
                    content = null;
                    // content = "Н";
                    isAttended = false;
                    break;
                // case "cell_absent":
                //     e.target.className = "cell";
                //     newClassname = "table-default";
                //     content = null;
                //     isAttended = null;
                //     break;
            }
            this.props.group.usersFromGroup.forEach(value => {
                let elem = document.getElementById(value.guid + key + "cell");
                // console.log(elem.className);
                elem.className = newClassname;
                elem.innerHTML = content;
                let mapAttendance = this.state.newAttendance;
                // console.log(mapAttendance);
                let tempNewAttendance = mapAttendance.get(value.guid);
                // console.log(tempNewAttendance);
                let thisDate = new Date(new Date(this.state.selectedMonth).setDate(key)).toLocaleISOString();
                let attendance = tempNewAttendance.find(element => {
                    if (element.date === thisDate) {
                        return element;
                    }
                }) || {date: thisDate};
                attendance.isAttended = isAttended;
                if (tempNewAttendance.indexOf(attendance) === -1) {
                    tempNewAttendance.push(attendance);
                }
                mapAttendance.set(value.guid, tempNewAttendance);
                // console.log(mapAttendance);
                this.setState({newAttendance: mapAttendance});
            })
        }
    }

    paymentModalToggle(isOpen) {
        this.setState({isPaymentModalOpen: isOpen});
    }

    paymentModalCallback(value) {
        console.log(value);
        if (value) {
            this.props.addPayment(this.state.userId, {
                amount: value,
                payday: new Date().toISOString()
            });
        }
    }

    addPayment(userId) {
        this.setState({isPaymentModalOpen: true, userId: userId});
    }

    clickAttendanceHandler(userId, key, e) {
        // console.log(e.target);
        // let elem = document.getElementById(userId + key + "cell");
        // console.log(elem);
        if (this.props.attendance.isEdit) {
            let mapAttendance = this.state.newAttendance;
            // console.log(mapAttendance);
            let tempNewAttendance = mapAttendance.get(userId);
            // console.log(tempNewAttendance);
            let thisDate = new Date(new Date(this.state.selectedMonth).setDate(key)).toLocaleISOString();
            let attendance = tempNewAttendance.find(element => {
                if (element.date === thisDate) {
                    return element;
                }
            }) || {date: thisDate};
            // let attendance = {date: thisDate};
            // console.log(attendance);
            // e.target.userSelect="none";
            console.log(e.target);
            switch (e.target.className) {
                case "table-secondary":
                case "table-default":
                    e.target.className = "table-primary";
                    e.target.innerHTML = "Б";
                    attendance.isAttended = true;
                    break;
                case "table-primary":
                    // e.target.className = "table-secondary";
                    e.target.className = "table-default";
                    e.target.innerHTML = null;
                    // e.target.innerHTML = "Н";
                    attendance.isAttended = false;
                    break;
            }
            if (tempNewAttendance.indexOf(attendance) === -1) {
                tempNewAttendance.push(attendance);
            }
            mapAttendance.set(userId, tempNewAttendance);
            // console.log(mapAttendance);
            this.setState({newAttendance: mapAttendance})
        }
    }

    render() {
        console.log("this.state", this.state);
        // console.log("this.props", this.props);
        return (
            <div className="container-fluid">
                <div className="row">
                    <ModalAddPayment isOpen={this.state.isPaymentModalOpen}
                                     paymentModalCallback={this.paymentModalCallback}
                                     paymentModalToggle={this.paymentModalToggle}/>
                    <div className="main-container_large">
                        <h3>Посещаемость</h3>
                        <hr/>
                        <Form getSelectedGroupId={this.getSelectedGroupId} getSelectedDate={this.getSelectedDate}
                              groups={this.props.group.groups} isEdit={this.props.attendance.isEdit}/>
                        <hr/>
                        <div>{this.state.groupsMap.size && this.state.selectedGroupId ?
                            <div>
                                <h6>Цена за одно занятие:</h6>
                                <p>{this.state.groupsMap.get(this.state.selectedGroupId).cost} руб.</p>
                                <hr/>
                            </div> : null}
                        </div>
                        <div className="mb-2">
                            <EditSaveButtons
                                isLoaded={this.props.attendance.isLoaded && this.props.schedule.isLoaded && this.state.selectedGroupId && this.state.selectedMonth}
                                isEdit={this.props.attendance.isEdit}
                                onEdit={this.onEdit} onSave={this.onSave}/>
                        </div>
                        {this.props.attendance.isLoaded && this.props.schedule.isLoaded && this.state.selectedGroupId && this.state.selectedMonth ?
                            <AttendanceAndPaymentsTable props={this.state}
                                                        onClickHead={this.clickAttendanceHeadHandler}
                                                        onClickBody={this.clickAttendanceHandler}
                                                        onAddPayment={this.addPayment}
                                                        isAttendanceEdit={this.props.attendance.isEdit}
                                                        usersFromGroup={this.props.group.usersFromGroup}/> : null}

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            group: state.group,
            schedule: state.schedule,
            attendance: state.attendance,
            payments: state.payments
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators,
        scheduleActionCreators, attendanceActionCreators, paymentsActionCreators), dispatch)
)(AttendanceAndPayments)