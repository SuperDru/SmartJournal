import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {statisticsActionCreators} from "../../../store/redux/statistics/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {StatisticsTable} from "../../components/statistics/StatisticsTable";
// import Form from "../../components/other/Form";
import Spinner from "../../components/other/Spinner";
import StatisticsForm from "../../components/other/StatisticsForm";


class Statistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: new Date().getBeginOfMonth(),
            // selectedGroupId: null,
            groupsMap: new Map()
        };
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.getSelectedGroupId = this.getSelectedGroupId.bind(this);
    }

    componentDidMount() {
        this.props.getAllGroups();
        this.props.buildStatistics(new Date(new Date(this.state.selectedMonth).setMonth(new Date().getMonth() - 1)).toLocaleISOString().slice(0, 7));
        // this.props.buildStatistics(this.state.selectedMonth.toLocaleISOString().slice(0, 7));
        // console.log("date", this.state.selectedMonth.toLocaleISOString().slice(0, 7));
        this.props.getAllStatistics(this.state.selectedMonth.toLocaleISOString().slice(0, 7));
        // this.props.getAllStatistics(new Date(new Date(this.state.selectedMonth).setMonth(new Date().getMonth() - 1)).toLocaleISOString().slice(0, 7));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedMonth !== prevState.selectedMonth) {
            // if (this.state.selectedGroupId || this.state.selectedGroupId !== prevState.selectedGroupId) {
            //     this.props.getGroupStatistics(this.state.selectedGroupId, this.state.selectedMonth.toLocaleISOString().slice(0, 7))
            // } else {
            this.props.getAllStatistics(this.state.selectedMonth.toLocaleISOString().slice(0, 7));
            // }
        }
        if (this.props.group.isLoaded !== prevProps.group.isLoaded && this.props.statistics.isLoaded ||
            this.props.statistics.isLoaded !== prevProps.statistics.isLoaded && this.props.group.isLoaded) {
            let tempGroupsMap = new Map();
            let {groups} = this.props.group;
            let {allStatistics} = this.props.statistics;
            console.log(this.props.group, this.props.statistics);
            for (let i = 0; i < groups.length; i++) {
                tempGroupsMap.set(groups[i].guid, {
                    name: groups[i].name,
                    days: groups[i].days,
                    startTimes: groups[i].startTimes,
                    duration: groups[i].duration,
                    cost: groups[i].cost,
                    peopleAmount: allStatistics[i].peopleAmount,
                    visitsAmount: allStatistics[i].visitsAmount,
                    attendancePercentage: allStatistics[i].attendancePercentage,
                    expectedIncome: allStatistics[i].expectedIncome,
                })
            }
            this.setState({
                groupsMap: tempGroupsMap
            })
        }
    }

    getSelectedDate(value) {
        this.setState({selectedMonth: new Date(value).getBeginOfMonth()});
    }

    getSelectedGroupId(value) {
        this.setState({selectedGroupId: value});
    }

    render() {
        // console.log("this.props", this.props);
        // console.log("this.state", this.state);
        return (<div className="container-fluid">
            <div className="row">
                <div className="main-container_large">
                    <h3>Статистика</h3>
                    <hr/>
                    {/*<Form getSelectedGroupId={this.getSelectedGroupId} getSelectedDate={this.getSelectedDate}*/}
                    {/*      groups={this.props.group.groups} isEdit={false}/>*/}
                    <StatisticsForm getSelectedDate={this.getSelectedDate}/>
                    <hr/>
                    {this.props.statistics.isLoaded && this.props.group.isLoaded ?
                        // !this.state.selectedGroupId
                        // && this.props.statistics.allStatistics.length
                        // ?
                        this.props.statistics.allStatistics.length ?
                            <StatisticsTable groups={this.state.groupsMap}
                                             statistics={this.props.statistics.groupStatistics}/>
                            //{/*<StatisticsTable groups={new Map(this.state.groupsMap.get(this.state.selectedGroupId))}*/}
                            // statistics={this.props.statistics.groupStatistics}/>
                            : <Spinner/> : <div><p>Данных о статистике за выбранный месяц еще нет.</p></div>}
                </div>
            </div>
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