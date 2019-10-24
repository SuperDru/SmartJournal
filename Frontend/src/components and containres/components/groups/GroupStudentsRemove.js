import React from "react"
import {Link} from "react-router-dom";

export const GroupStudentsRemove = props => (
    props.usersFromGroup.map(user => (
        <div className="m-2">
            <div className="d-inline-block">
                <Link
                    to={`/users/user_${user.guid}`}>
                    {user.name} {user.surname} {user.patronymic}
                </Link>
            </div>
            <div className="d-inline-block">
                <button className="btn btn-danger btn-sm ml-3" onClick={props.onDeleteUserFromGroup}
                        id={user.guid}><span className="oi oi-x"/>
                </button>
            </div>
        </div>
    ))
);