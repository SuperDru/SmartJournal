import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Loading from "../../../rubbish/Loading";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {GroupAddStudents} from "../../components/groups/GroupAddStudents";
// import {GroupCreatingProfile} from "../../components/groups/GroupCreatingProfile";
import GroupCreatingProfile from "../../components/groups/GroupCreatingProfile";
import {GroupCreatingWeekSchedule} from "../../components/groups/GroupCreatingWeekSchedule";
import {GroupStudentsRemove} from "../../components/groups/GroupStudentsRemove";
import ModalWarning from "../../components/modals/ModalWarning";
import Spinner from "../../components/other/Spinner";


class GroupEdit extends Component {

    constructor(props) {
        super(props);
        let tempCbMap = new Map();
        let tempStMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempCbMap.set(i + "cb", false);
            tempStMap.set(i + "stForm", null);
        }
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
            warningMessage: "Вы уверены, что хотите удалить студента из группы?",
            isWarningOpen: false
        };
        this.onSaveEditGroup = this.onSaveEditGroup.bind(this);
        this.onDeleteUserFromGroup = this.onDeleteUserFromGroup.bind(this);
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
        this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);
        this.handleStartTimesInputsChange = this.handleStartTimesInputsChange.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.groupProfileCallback = this.groupProfileCallback.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
        this.props.getUsersFromGroup(this.props.groupId);
        this.props.getAllUsers();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log("WillReceiveProps");
        if (this.props.group.groupById) {
            let tempCbMap = new Map();
            let tempStMap = new Map();
            for (let i = 0; i < 7; i++) {
                tempCbMap.set(i + "cb", this.props.group.groupById.days[i]);
                tempStMap.set(i + "stForm", this.props.group.groupById.startTimes[i]);
            }
            // console.log(tempStMap, tempCbMap);
            this.setState({
                    checkboxes: tempCbMap,
                    stInputs: tempStMap,
                    name: this.props.group.groupById.name || null,
                    duration: this.props.group.groupById.duration || null,
                    cost: this.props.group.groupById.cost || null,
                    days: this.props.group.groupById.days || [],
                    startTimes: this.props.group.groupById.startTimes || []
                }
            )
        }
    }

    groupProfileCallback(groupInfo) {
        // console.log(groupInfo);
        this.setState({name: groupInfo.name, cost: groupInfo.cost, duration: groupInfo.duration})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("did-update");
        if (!this.props.group.isLoaded) {
            this.props.getUsersFromGroup(this.props.groupId);
        }
        // console.log(this.props.group.usersFromGroup);
        // console.log(prevProps.group.usersFromGroup);
    }


    onSaveEditGroup() {
        let tempArr = [];
        // let data = Object.assign({}, this.state.data);
        let data = {
            name: this.state.name,
            cost: this.state.cost,
            duration: this.state.duration,
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
        for (let i = 0; i < 7; i++) {
            if (!data.days[i]) {
                data.startTimes[i] = null;
            }
        }
        console.log(data);
        this.props.editGroupSubmit(this.props.groupId, data);
        // if (this.state.chosenUsers.length) {
        data = [];
        this.state.chosenUsers.forEach((value, key) => {
            data.push(key);
        });
        // } else {
        //     data = null
        // }
        this.props.addUsersToGroupSubmit(this.props.groupId, data);
        this.props.history.goBack();
    }

    handleCheckboxesChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    handleStartTimesInputsChange(e) {
        this.setState({stInputs: this.state.stInputs.set(e.target.id, e.target.value)});
    }

    handleUsersChange(e) {
        let tempMap = new Map(this.state.chosenUsers);
        if (e.target.checked) {
            tempMap.set(e.target.id, 0);
            // console.log(tempMap);
            this.setState({chosenUsers: tempMap});
        } else {
            tempMap.delete(e.target.id);
            this.setState({chosenUsers: tempMap})
        }
    }

    warningToggle(isOpen) {
        this.setState({
            isWarningOpen: isOpen
        })
    }

    warningCallback(value) {
        if (value) {
            this.props.deleteUserFromGroup(this.props.groupId, this.state.userIdToDelete);
        }
    }

    onDeleteUserFromGroup(e) {
        // console.log(e.target.id);
        this.setState({
            isWarningOpen: true,
            userIdToDelete: e.target.id
        });
    }

    render() {
        // console.log("render edit group");
        // console.log("this.state", this.state);
        // console.log(id);
        // console.log("this.props", this.props.group.usersFromGroup);
        return (
            <div className="container-fluid">
                <div className="row justify-content-sm-between">
                    <div className="main-container">
                        <ModalWarning warningMessage={this.state.warningMessage} isOpen={this.state.isWarningOpen}
                                      warningToggle={this.warningToggle}
                                      warningCallback={this.warningCallback}/>
                        <h4 className="main-container__header col-sm-6">Редактирование группы</h4>
                        <hr/>
                        <h5 className="col-xs-2 col-form-label">Основная информация</h5>
                        <GroupCreatingProfile groupById={{
                            name: this.state.name,
                            duration: this.state.duration,
                            cost: this.state.cost,
                        }}
                            // handleInputChange={this.handleInputChange}
                                              groupProfileCallback={this.groupProfileCallback}/>
                        <hr/>
                        <h5 className="col-xs-2 col-form-label">Расписание:</h5>
                        <GroupCreatingWeekSchedule props={this.state} groupById={this.props.group.groupById}
                                                   handleCheckboxesChange={this.handleCheckboxesChange}
                                                   handleStartTimesInputsChange={this.handleStartTimesInputsChange}/>
                        <hr/>
                        <div>
                            <h5 className="col-xs-2 col-form-label">Студенты этой группы:</h5>
                            {this.props.group.usersFromGroup ?
                                <GroupStudentsRemove usersFromGroup={this.props.group.usersFromGroup}
                                                     onDeleteUserFromGroup={this.onDeleteUserFromGroup}/> : <Spinner/>}
                        </div>
                        <hr/>
                        <h5 className="col-xs-2 col-form-label">Добавьте студентов в группу: </h5>
                        {this.props.user.users ?
                            <div className="m-2">
                                <small>Веберите студентов из списка, чтобы добавить их в группу</small>
                                <GroupAddStudents users={this.props.user.users}
                                                  handleUsersChange={this.handleUsersChange}/>
                            </div> : <Spinner/>}
                        <hr/>
                        <div className="mt-3">
                            <button
                                // to='/groups/group_list'
                                className='btn btn-success'
                                onClick={this.onSaveEditGroup}>Сохранить
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
)
(GroupEdit);