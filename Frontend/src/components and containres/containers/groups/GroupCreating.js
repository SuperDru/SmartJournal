import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {GroupCreatingWeekSchedule} from "../../components/groups/GroupCreatingWeekSchedule";
import {GroupAddStudents} from "../../components/groups/GroupAddStudents";
import Spinner from "../../components/other/Spinner";
import GroupCreatingProfile from "../../components/groups/GroupCreatingProfile";
import "../../../css/GroupCreating.css"

class GroupCreating extends Component {

    constructor(props) {
        super(props);
        let tempCbMap = new Map();
        let tempStMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempCbMap.set(i + "cb", false);
            tempStMap.set(i + "stForm", null);
        }
        const groupDataFromSessionStorage = JSON.parse(sessionStorage.getItem("savedGroupData"));
        console.log(groupDataFromSessionStorage);
        this.state = {
            checkboxes: tempCbMap,
            stInputs: tempStMap,
            chosenUsers: [],
            data: {
                name: null,
                duration: null,
                cost: null,
                days: [],
                startTimes: []
            },
            name: groupDataFromSessionStorage ? groupDataFromSessionStorage.name : null,
            duration: groupDataFromSessionStorage ? groupDataFromSessionStorage.duration : null,
            cost: groupDataFromSessionStorage ? groupDataFromSessionStorage.cost : null,
            costError: "Это поле обязательно",
            durationError: "Это поле обязательно",
            nameError: "Это поле обязательно",
        };
        this.onSaveGroup = this.onSaveGroup.bind(this);
        this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.handleStartTimesInputsChange = this.handleStartTimesInputsChange.bind(this);
        this.groupProfileCallback = this.groupProfileCallback.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.duration !== prevState.duration
            || this.state.cost !== prevState.cost) {
            const savedGroupData = {
                name: this.state.name,
                cost: this.state.cost,
                duration: this.state.duration,
            };
            sessionStorage.setItem("savedGroupData", JSON.stringify(savedGroupData));
        }
    }

    onSaveGroup() {
        let tempArr = [];
        // let data = Object.assign({}, this.state.data);
        let data = {
            name: this.state.name,
            cost: this.state.cost,
            duration: this.state.duration
        };
        this.state.checkboxes.forEach((v) => {
            tempArr.push(v);
        });
        data.days = tempArr;
        tempArr = [];
        this.state.stInputs.forEach((v) => {
            tempArr.push(v);
        });
        data.startTimes = tempArr;
        // console.log(data);
        this.props.createGroupSubmit(data);
        this.props.history.goBack();
    }

    groupProfileCallback(groupInfo) {
        // console.log(groupInfo);
        this.setState({name: groupInfo.name, cost: groupInfo.cost, duration: groupInfo.duration})
    }

    componentWillUnmount() {
        // console.log("will unmount this.props ", this.props.group);
        let data = [];
        this.state.chosenUsers.forEach((value, key) => {
            data.push(key);
        });
        if (data.length) {
            this.props.addUsersToGroup(data)
        }
        // sessionStorage.removeItem("savedGroupData");

        // const savedGroupData = {
        //     name: this.state.name,
        //     cost: this.state.cost,
        //     duration: this.state.duration,
        // };
        // sessionStorage.setItem("savedGroupData", JSON.stringify(savedGroupData));
        // this.props.addUsersToGroupSubmit(this.props.newGroup.guid, data);
    }

    handleCheckboxesChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    handleStartTimesInputsChange(e) {
        this.setState({stInputs: this.state.stInputs.set(e.target.id, e.target.value)});
    }

    handleUsersChange(e) {
        // console.log("check before: ", this.state);
        // console.log("e.target.id", e.target.id);
        // console.log("e.target.id", e.target.checked);
        let tempMap = new Map(this.state.chosenUsers);
        if (e.target.checked) {
            tempMap.set(e.target.id, 0);
            // console.log(tempMap);
            this.setState({chosenUsers: tempMap});
        } else {
            tempMap.delete(e.target.id);
            this.setState({chosenUsers: tempMap})
        }
        // console.log("check: ", this.state.chosenUsers);
    }

    render() {
        console.log("this.state", this.state);
        // console.log("ls", sessionStorage.getItem("savedGroupData"));
        return (<div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="main-container">
                        <h4 className="main-container__header">Создание группы</h4>
                        <hr/>
                        <h6 className="col-xs-2 col-form-label">Основная информация :</h6>
                        <GroupCreatingProfile groupProfileCallback={this.groupProfileCallback} groupById={{
                            name: this.state.name,
                            duration: this.state.duration,
                            cost: this.state.cost
                        }}/>
                        <hr/>
                        <h6 className="col-xs-2 col-form-label"> Расписание :</h6>
                        <GroupCreatingWeekSchedule props={this.state}
                                                   handleCheckboxesChange={this.handleCheckboxesChange}
                                                   handleStartTimesInputsChange={this.handleStartTimesInputsChange}/>
                        <hr/>
                        <div>
                            {this.props.user.users ? <div>
                                <h6>Добавьте студентов в группу:</h6>
                                <div className="ml-4">
                                    <GroupAddStudents users={this.props.user.users}
                                                      handleUsersChange={this.handleUsersChange}/></div>
                            </div> : <Spinner/>}
                        </div>
                        <div className="ml-0 m-3">
                            <button className='btn btn-success'
                                    onClick={this.onSaveGroup}>Сохранить
                            </button>
                        </div>
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
            user: state.user
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators, userActionCreators), dispatch)
)(GroupCreating);