import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {userActionCreators} from "../../../rubbish/userReducer";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {Route, Switch} from "react-router-dom";
import UserCreating from "./UserCreating";
import UserList from "./UsersList";
import UserPage from "./UserPage";
import UserEdit from "./UserEdit";


class UsersRoute extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/users" component={UserList}/>
                    <Route path='/users/creating_user' component={UserCreating}/>
                    <Route exact path='/users/user_:id'
                           render={({match}) => (<UserPage userId={(match.params.id)} history={this.props.history}/>)}/>
                    <Route exact path='/users/edit_user/user_:id'
                           render={({match}) => (<UserEdit userId={(match.params.id)} history={this.props.history}/>)}/>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UsersRoute);