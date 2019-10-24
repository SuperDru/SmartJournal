import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {actionCreators} from "../../store/reducers/groupReducer";
import {Link} from "react-router-dom";
import Loading from "../../../rubbish/Loading";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Search from "../../components/other/Search";
import Spinner from "../../components/other/Spinner";

class GroupsList extends Component {

    componentDidMount() {
        console.log("user-list-did-mount");
        this.props.getAllGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoaded === false) {
            this.props.getAllGroups();
        }
        if (this.props.newGroup !== prevProps.newGroup) {
            // if (!this.props.isUsersAddedToGroup) {
            console.log("addUserToGroup");
            if (this.props.usersToGroup) {
                this.props.addUsersToGroupSubmit(this.props.newGroup.guid, this.props.usersToGroup);
            }
            // }
        }
    }

    render() {
        console.log('render-group-list-page');
        // console.log("this.props", this.props);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="main-container_large">
                        <h3>Группы</h3>
                        <hr/>
                        <Search/>
                        <hr/>
                        {this.props.isLoaded ?
                            this.props.groups.map(group => (
                                <div>
                                    <h5><Link to={`/groups/group_${group.guid}`}>{group.name}</Link></h5>
                                </div>
                            )) : <Spinner/>}
                        <div>
                            <Link to='/groups/creating_group'
                                  className='btn btn-primary' onClick={this.props.createGroup}><span
                                className="oi oi-plus"/>Добавить
                                группу</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(groupActionCreators, dispatch)
)(GroupsList)