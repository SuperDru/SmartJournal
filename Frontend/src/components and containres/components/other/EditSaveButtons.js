import React from "react"

export const EditSaveButtons = (props) => (
    <div className="buttons">
        {props.isLoaded ?
            <button
                onClick={props.onEdit}
                type="redact"
                className="btn btn-info"
                disabled={props.isEdit}>
                <span className="oi oi-pencil"/>
                Редактировать таблицу
            </button> : null}
        {props.isEdit ?
            <button
                onClick={props.onSave}
                type="save"
                className="btn btn-success ">
                <span className="oi oi-file"/>
                Сохранить
            </button> : null
        }
    </div>
);
