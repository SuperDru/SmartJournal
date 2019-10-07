import React from "react"
import {Link} from "react-router-dom";

export const GroupStudents = (props) => (
    props.usersFromGroup.map(user =>
        <div>
            <Link
                to={`/users/user_${user.guid}`}>{user.name} {user.surname} {user.patronymic}</Link>
        </div>
    )
);