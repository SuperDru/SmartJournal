import React from "react"
import "../../../css/GroupCreatingProfile.css"

export const GroupCreatingProfile = (props) => {
    console.log("props profile", props);
    return (<div className="container-fluid">
        <div className="group-creating__profile">
            {/*<form className="form-inline">*/}
            <form>
                <div className="form-group row">
                    <label htmlFor="groupName"
                           className="col-md-3 col-form-label">Название</label>
                    {/*<div className="col-xs-10">*/}
                    <input className="form-control col-md-7 m-0"
                           type="text"
                           placeholder="Введите название"
                           id='groupName'
                           defaultValue={props.groupById ? props.groupById.name : null}
                           onChange={props.handleInputChange}
                    />
                </div>
                {/*</form>*/}
                <div className="form-group row">
                    <label htmlFor="cost"
                           className="col-md-3 col-form-label">Цена за
                        занятие</label>
                    {/*<div className="col-xs-10">*/}
                    <input className="form-control col-md-7 m-0"
                           type="number"
                           placeholder="Цена за занятие"
                           id='cost'
                           defaultValue={props.groupById ? props.groupById.cost : null}
                           onChange={props.handleInputChange}
                    />
                    {/*</div>*/}
                </div>
                <div className="form-group row">
                    <label htmlFor="duration"
                           className="col-md-5 col-form-label">Продолжительность
                        занятия</label>
                    {/*<div className="col-xs-10">*/}
                    <input className="form-control col-md-7 m-0"
                           type="number"
                           placeholder="Продолжительность (в мин.)"
                           id='duration'
                           defaultValue={props.groupById ? props.groupById.duration : null}
                           onChange={props.handleInputChange}
                    />
                    {/*</div>*/}
                </div>
            </form>
        </div>
    </div>);
};