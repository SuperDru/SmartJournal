import React from "react"
import {Link} from "react-router-dom";

export const GroupAddStudents = (props) => (<div>
        {props.users.map(user => (<div className="form-inline">
            <div className="custom-control custom-checkbox">
                <input className="custom-control-input"
                       type="checkbox"
                       value=""
                       onChange={props.handleUsersChange}
                       id={user.guid}
                />
                <label className="custom-control-label" htmlFor={user.guid}>
                    <span className="text-hide">Never</span>
                </label>
            </div>
            <Link to={`/users/user_${user.guid}`}>
                {user.name} {user.surname} {user.patronymic}</Link>
        </div>))
        }</div>
);