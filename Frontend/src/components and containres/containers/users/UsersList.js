import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
// import Loading from "../../components/Loading";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import Search from "../../components/other/Search";
import Spinner from "../../components/other/Spinner";


class UsersList extends Component {

    componentDidMount(prevProps) {
        console.log("user-list-did-mount");
        this.props.getAllUsers();
        console.log("initial get method");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.isLoaded) {
            console.log("additional get method");
            this.props.getAllUsers();
        }
    }

    render() {
        console.log("render-users-list");
        console.log("props", this.props);
        return (
            <div>
                <h3>Студенты</h3>
                <Search/>
                {this.props.users ?
                    this.props.users.map(user => (
                        <div key={user.guid}>
                            <h5><Link to={`/users/user_${user.guid}`}>{user.name} {user.surname}</Link></h5>
                        </div>
                    )) : <Spinner/>}
                <Link to='/users/creating_user'
                      className='btn btn-primary'
                      onClick={this.addUser}>
                    +Добавить ученика</Link>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UsersList)