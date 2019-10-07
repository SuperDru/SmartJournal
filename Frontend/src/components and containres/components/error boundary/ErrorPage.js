import React from "react"
import "../../../css/ErrorPage.css"

export const ErrorPage = (props) => {
    // console.log("error");
    return (<div>
        <div className="container">
            <div className="error-page">
                <div>
                    <h1>Ошибка...</h1>
                    {props.error.status ? <div>
                            <p className="error-page__msg">Error {props.error.status}</p>
                            <p className="error-page__msg">{props.error.data.message}</p>
                            <p className="error-page__msg">{props.error.statusText}</p>
                        </div> :
                        <p className="error-page__msg">Упс! Что-то пошло не так <br/>:(</p>}
                    <a href="/" className="btn btn-primary error-page__btn">
                        Вернуться на главную страницу
                    </a>
                </div>
            </div>
        </div>
    </div>)
};
