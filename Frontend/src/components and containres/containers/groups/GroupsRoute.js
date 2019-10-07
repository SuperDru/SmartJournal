import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route} from "react-router-dom"
import '../../../css/Groups.css'
import GroupsList from "./GroupsList";
import GroupsCreating from "./GroupCreating";
import GroupsEdit from "./GroupEdit";
import GroupPage from "./GroupPage";
import AddUserToGroup from "../../../rubbish/AddUserToGroup";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";

class GroupsRoute extends Component {

    render() {
        return (
            <div>
                <Route exact path='/groups' component={GroupsList}/>
                <Route path='/groups/creating_group' component={GroupsCreating}/>
                <Route exact path='/groups/group_:id'
                       render={({match}) => (<GroupPage groupId={match.params.id} history={this.props.history}/>)}/>
                <Route path='/groups/edit_group/group_:id'
                       render={({match}) => (<GroupsEdit groupId={match.params.id} history={this.props.history}/>)}/>
                <Route path='/groups/edit_group/add_users_to_group_:id'
                       render={({match}) => (
                           <AddUserToGroup groupId={match.params.id} history={this.props.history}/>)}/>
            </div>
        );
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(groupActionCreators, dispatch)
)(GroupsRoute);