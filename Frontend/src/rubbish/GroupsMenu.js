import React, {Component} from "react"
import {Link} from "react-router-dom";

export default () => (
    <div>
        <Link to='/groups/' className='btn btn-outline-primary'>
            Список групп
        </Link>
        <Link to='groups/user_list' className="btn btn-outline-primary">
            Список учеников
        </Link>
    </div>
)