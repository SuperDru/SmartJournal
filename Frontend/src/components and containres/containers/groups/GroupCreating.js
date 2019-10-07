import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {GroupCreatingProfile} from "../../components/groups/GroupCreatingProfile";
import {GroupCreatingWeekSchedule} from "../../components/groups/GroupCreatingWeekSchedule";
import {GroupAddStudents} from "../../components/groups/GroupAddStudents";
import Spinner from "../../components/other/Spinner";

class GroupCreating extends Component {

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
            }
        };
        this.onSaveGroup = this.onSaveGroup.bind(this);
        this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartTimesInputsChange = this.handleStartTimesInputsChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    onSaveGroup() {
        let tempArr = [];
        let data = Object.assign({}, this.state.data);
        this.state.checkboxes.forEach((v) => {
            tempArr.push(v);
        });
        data.days = tempArr;
        tempArr = [];
        this.state.stInputs.forEach((v) => {
            tempArr.push(v);
        });
        data.startTimes = tempArr;
        console.log(data);
        this.props.createGroupSubmit(data);
        this.props.history.goBack();
    }

    componentWillUnmount() {
        // console.log("will unmount this.props ", this.props.group);
        let data = [];
        this.state.chosenUsers.forEach((value, key) => {
            data.push(key);
        });
        this.props.addUsersToGroup(data)
        // this.props.addUsersToGroupSubmit(this.props.newGroup.guid, data);
    }

    handleCheckboxesChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    handleInputChange(e) {

        // console.log(e.target);
        let temp = Object.assign({}, this.state.data);
        switch (e.target.id) {
            case 'groupName':
                temp.name = e.target.value;
                // this.setState({data: this.state.})
                break;
            case 'cost':
                temp.cost = e.target.value;
                // this.setState({surname: e.target.value});
                break;
            case 'duration':
                temp.duration = e.target.value;
                // this.setState({patronymic: e.target.value});
                break;
            // case "email-input":
            //     this.setState({email: e.target.value});
            //     break;
            // case "tel-input":
            //     this.setState({phoneNumber: e.target.value});
            //     break;
        }
        this.setState({data: temp});
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
        // console.log("this.state", this.state);
        return (<div className="container-fluid">
                <h4>Создание группы</h4>
                <GroupCreatingProfile handleInputChange={this.handleInputChange}/>
                <label
                    htmlFor="example-text-input"
                    className="col-xs-2 col-form-label"> Расписание :</label>
                <GroupCreatingWeekSchedule props={this.state} handleCheckboxesChange={this.handleCheckboxesChange}
                                           handleStartTimesInputsChange={this.handleStartTimesInputsChange}/>
                <div>
                    {this.props.user.users ? <div>
                        <h5>Добавьте студентов в группу:</h5>
                        <GroupAddStudents users={this.props.user.users}
                                          handleUsersChange={this.handleUsersChange}/>
                    </div> : <Spinner/>}
                </div>
                <div>
                    <button className='btn btn-success'
                            onClick={this.onSaveGroup}>Сохранить
                    </button>
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