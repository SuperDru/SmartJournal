import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {statisticsReducer} from "../../../store/redux/statistics/reducer";
import {statisticsActionCreators} from "../../../store/redux/statistics/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {StatisticsTable} from "../../components/statistics/StatisticsTable";
import Form from "../../components/other/Form";


class Statistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: new Date(new Date().setMonth(new Date().getMonth() - 1)).getBeginOfMonth(),
            selectedGroupId: null
        }
    }

    componentDidMount() {
        this.props.getAllGroups();
        this.props.buildStatistics(this.state.selectedMonth.toLocaleISOString().slice(0, 7));
        // console.log("date", this.state.selectedMonth.toLocaleISOString().slice(0, 7));
        // this.props.getAllStatistics(this.state.selectedMonth.toLocaleISOString().slice(0, 7));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedMonth !== prevState.selectedMonth && this.state.selectedGroupId) {
            this.props.getGroupStatistics(this.state.selectedGroupId)
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
        if (this.state.selectedGroupId !== prevState.selectedGroupId) {
        }
    }

    getSelectedDate(value) {
        this.setState({selectedMonth: new Date(value).getBeginOfMonth()});
    }

    getSelectedGroupId(value) {
        this.setState({selectedGroupId: value});
    }

    render() {
        console.log("this.props", this.props);
        return (<div>
            <h3>Статистика</h3>
            <Form getSelectedGroupId={this.getSelectedGroupId} getSelectedDate={this.getSelectedDate}
                  groups={this.props.group.groups} isEdit={false}/>
            <StatisticsTable groupById={this.state.groupsMap.get(this.state.selectedGroupId)}
                             statistics={this.props.statistics.groupStatistics}/>
        </div>)
    }
}

export default connect(
    state => {
        return {
            statistics: state.statistics,
            group: state.group
        }
    },
    dispatch => bindActionCreators(Object.assign({}, statisticsActionCreators, groupActionCreators), dispatch)
)(Statistics);