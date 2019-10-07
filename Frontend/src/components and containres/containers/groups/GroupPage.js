import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import "../../../css/GroupPage.css"
import Loading from "../../../rubbish/Loading"
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {GroupPageProfile} from "../../components/groups/GroupPageProfile";
import {GroupWeekSchedule} from "../../components/groups/GroupWeekSchedule";
import {GroupStudents} from "../../components/groups/GroupStudents";
import ModalWarning from "../../components/modals/ModalWarning";
import Spinner from "../../components/other/Spinner";


class GroupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWarningOpen: false,
            userById: null,
            warningMessage: "Вы уверены, что хотите удалить группу? Вся информация о ней не сохранится!"
        };
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
        this.props.getUsersFromGroup(this.props.groupId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoaded === false) {
            this.props.getGroupById(this.props.groupId);
            this.props.getUsersFromGroup(this.props.groupId);
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
        // console.log("props", this.props);
        return (
            <div className="container">
                <ModalWarning warningMessage={this.state.warningMessage} isOpen={this.state.isWarningOpen}
                              warningToggle={this.warningToggle}
                              warningCallback={this.warningCallback}/>
                <div className="group-page__info">
                    <h4>Страница группы</h4>
                    {this.props.groupById ? <div>
                        <div>
                            <GroupPageProfile groupById={this.props.groupById}/>
                            <GroupWeekSchedule groupById={this.props.groupById}/>
                        </div>
                        <h5>Студенты этой группы:</h5>
                        {this.props.usersFromGroup ?
                            <GroupStudents usersFromGroup={this.props.usersFromGroup}/> : <Spinner/>}
                        <div>
                            <button
                                className="btn btn-outline-danger"
                                onClick={this.onDeleteGroup}>Удалить
                            </button>
                            <Link to={`/groups/edit_group/group_${this.props.groupId}`}
                                  className="btn btn-outline-warning"
                                  onClick={() => this.props.editGroup(this.props.groupId.guid)}>Редактировать</Link>
                        </div>
                    </div> : <Spinner/>}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(groupActionCreators, dispatch)
)(GroupPage)