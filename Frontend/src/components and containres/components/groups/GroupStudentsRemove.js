import React from "react"
import {Link} from "react-router-dom";

export const GroupStudentsRemove = props => (
    props.usersFromGroup.map(user => (
        <div>
            <Link
                to={`/users/user_${user.guid}`}>
                {user.name} {user.surname} {user.patronymic}
            </Link>
            <button className="btn btn-danger btn-sm" onClick={props.onDeleteUserFromGroup}
                    id={user.guid}>Удалить
            </button>
        </div>
    ))
);