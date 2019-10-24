import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import "../../../css/GroupPage.css"
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {GroupPageProfile} from "../../components/groups/GroupPageProfile";
import {GroupWeekSchedule} from "../../components/groups/GroupWeekSchedule";
import {GroupStudents} from "../../components/groups/GroupStudents";
import ModalWarning from "../../components/modals/ModalWarning";
import Spinner from "../../components/other/Spinner";
import {statisticsActionCreators} from "../../../store/redux/statistics/actionCreators";
import {StatisticsTable} from "../../components/statistics/StatisticsTable";


class GroupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWarningOpen: false,
            userById: null,
            warningMessage: "Вы уверены, что хотите удалить группу? Вся информация о ней не сохранится!",
            groupData: new Map()
        };
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
        this.props.getUsersFromGroup(this.props.groupId);
        let prevMonthDate = new Date(new Date(new Date().getBeginOfMonth()).setMonth(
            new Date().getMonth() - 1)).toLocaleISOString().slice(0, 7);
        console.log(prevMonthDate);
        this.props.getGroupStatistics(this.props.groupId, prevMonthDate);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.group.isLoaded === false) {
            this.props.getGroupById(this.props.groupId);
            this.props.getUsersFromGroup(this.props.groupId);
        }
        if (this.props.group.groupById !== prevProps.group.groupById && this.props.statistics.isLoaded
            || this.props.statistics.isLoaded !== prevProps.statistics.isLoaded && this.props.group.groupById) {
            let {groupById} = this.props.group;
            let {groupStatistics} = this.props.statistics;
            this.setState({
                groupData: new Map([[groupById.guid, {
                    name: groupById.name,
                    days: groupById.days,
                    startTimes: groupById.startTimes,
                    duration: groupById.duration,
                    cost: groupById.cost,
                    peopleAmount: groupStatistics.peopleAmount,
                    visitsAmount: groupStatistics.visitsAmount,
                    attendancePercentage: groupStatistics.attendancePercentage,
                    expectedIncome: groupStatistics.expectedIncome,
                }]])
            });
        }
    }

    warningToggle(isOpen) {
        this.setState({
            isWarningOpen: isOpen
        })
    }

    warningCallback(value) {
        if (value) {
            this.props.deleteGroup(this.props.groupId);
            this.props.history.goBack();
        }
    }

    onDeleteGroup() {
        this.setState({
            isWarningOpen: true
        })
    }

    render() {
        // console.log("render of group page ", this.props.groupById);//should add redirect
        console.log("props", this.props);
        return (
            <div className="container-fluid">
                <ModalWarning warningMessage={this.state.warningMessage} isOpen={this.state.isWarningOpen}
                              warningToggle={this.warningToggle}
                              warningCallback={this.warningCallback}/>
                <div className="row justify-content-center">
                    <div className="main-container">
                        <h4 className="main-container__header">Страница группы</h4>
                        <hr/>
                        <h6 className="col-xs-2 col-form-label">Основная информация</h6>
                        {this.props.group.groupById ? <div>
                            <div>
                                <GroupPageProfile groupById={this.props.group.groupById}/>
                                <h6 className="col-xs-2 col-form-label"> Расписание :</h6>
                                <div className="col">
                                    <GroupWeekSchedule groupById={this.props.group.groupById}/>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={this.onDeleteGroup}>
                                    <span className="oi oi-trash"/>
                                </button>
                                <Link to={`/groups/edit_group/group_${this.props.groupId}`}
                                      className="btn btn-outline-warning"
                                      onClick={() => this.props.editGroup(this.props.groupId.guid)}>
                                    <span className="oi oi-pencil"/>
                                </Link>
                            </div>
                            <hr/>
                            <h6 className="col-xs-2 col-form-label">Студенты этой группы:</h6>
                            <div className="col">
                                {this.props.group.usersFromGroup ?
                                    <div className="m-2">
                                        <GroupStudents usersFromGroup={this.props.group.usersFromGroup}/></div> :
                                    <Spinner/>}
                            </div>
                        </div> : <Spinner/>}
                        <hr/>
                        <h6>Статистика за предыдущий месяц</h6>
                        {this.props.statistics.groupStatistics ?
                            Object.keys(this.props.statistics.groupStatistics).length ?
                                <div className="m-2">
                                    <StatisticsTable groups={this.state.groupData}/></div> : <Spinner/>
                            : null}
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
            statistics: state.statistics
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators, statisticsActionCreators), dispatch)
)(GroupPage)