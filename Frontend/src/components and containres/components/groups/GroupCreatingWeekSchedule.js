import React from "react"

export const GroupCreatingWeekSchedule = (props) => {
    console.log("week sch props", props);
    return (<div>
        <div className="create-group__schedule-table">
            <table className='table table-striped table-bordered table-responsive-sm'>
                <thead>
                <tr>
                    <th>ПН</th>
                    <th>ВТ</th>
                    <th>СР</th>
                    <th>ЧТ</th>
                    <th>ПТ</th>
                    <th>СБ</th>
                    <th>ВС</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {renderCheckBoxes(props)}
                </tr>
                <tr>
                    {renderStartTimeInputs(props)}
                </tr>
                </tbody>
            </table>
        </div>

    </div>)
};

function renderCheckBoxes(props) {
    let result = [];
    for (let i = 0; i < 7; i++) {
        result.push(<td>
            <div className="custom-control custom-checkbox">
                <input className="custom-control-input"
                       type="checkbox"
                       onChange={props.handleCheckboxesChange}
                       id={i + "cb"}
                       name="cbName"
                       aria-label="..."
                       defaultChecked={props.groupById ? props.groupById.days[i] : null}
                />
                <label className="custom-control-label" htmlFor={i + "cb"}>
                    <span className="text-hide">Never</span>
                </label>
            </div>
        </td>)
    }
    return result;
}


function renderStartTimeInputs(props) {
    let result = [];
    for (let i = 0; i < 7; i++) {
        result.push(<td>
            <input
                className="form-control cell"
                type="time"
                id={i + "stForm"}
                name="startTimes"
                disabled={!props.props.checkboxes.get(i + "cb")}
                onChange={props.handleStartTimesInputsChange}
                defaultValue={props.groupById ? props.props.checkboxes.get(i + "cb") ? props.groupById.startTimes[i] : null : null}
            />
        </td>)
    }
    return result;
}