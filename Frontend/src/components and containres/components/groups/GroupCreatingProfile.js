import React, {Component} from "react"
import "../../../css/GroupCreatingProfile.css"


class GroupCreatingProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            cost: null,
            duration: null,
            costError: "Это поле обязательно",
            durationError: "Это поле обязательно",
            nameError: "Это поле обязательно",
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) { //??? все правильно?
        console.log("receive props");
        if (nextProps.groupById !== this.props.groupById) {
            this.setState({
                name: nextProps.groupById.name,
                cost: nextProps.groupById.cost,
                duration: nextProps.groupById.duration,
                costError: this.validateCost(nextProps.groupById.cost),
                durationError: this.validateDuration(nextProps.groupById.duration),
                nameError: this.validateGroupName(nextProps.groupById.name),
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.cost !== prevState.cost
            || this.state.duration !== prevState.duration) {
            this.props.groupProfileCallback(Object.assign({}, this.state))
        }
    }

    validateGroupName(value) {
        if (!value) {
            return "Это поле обязательно"
        }
        return !new RegExp(/[а-яa-z]+/gi).test(value) ?
            "Неверный ввод"
            : "";
    }

    validateCost(value) {
        if (!value) {
            return "Это поле обязательно"
        }
        return Number(value) <= 0 ? "Число должно быть положительным"
            : Number(value) > 10000 ?
                "Слишком большое число"
                : "";
    }

    validateDuration(value) {
        console.log(value);
        if (!value) {
            return "Это поле обязательно"
        }
        return Number(value) <= 0 ? "Число должно быть положительным"
            : Number(value) > 500 ?
                "Слишком большое число"
                : "";
    }

    handleInput(e) {
        switch (e.target.id) {
            case 'groupName':
                this.setState({name: e.target.value, nameError: this.validateGroupName(e.target.value)});
                break;
            case 'cost':
                this.setState({cost: e.target.value, costError: this.validateCost(e.target.value)});
                break;
            case 'duration':
                this.setState({duration: e.target.value, durationError: this.validateDuration(e.target.value)});
                break;
        }
    }

    generateClassNameByError(err) {
        return err ? "is-invalid" : "is-valid"
    }

    render() {
        console.log("form state", this.state);
        console.log("form props", this.props);
        const {groupById} = this.props;
        return (<div className="container-fluid">
            <div className="group-creating__profile">
                <form>
                    <div className="form-group row">
                        <label htmlFor="groupName"
                               className="col-sm-6 col-form-label">Название</label>
                        <input
                            className={"form-control col-sm-6 " + this.generateClassNameByError(this.state.nameError)}
                            type="text"
                            placeholder="Введите название"
                            id='groupName'
                            // defaultValue={groupById ? groupById.name : null}
                            value={this.state.name}
                            onInput={this.handleInput}
                        />
                        <div className="invalid-feedback flex">
                            <div className="text-right">{this.state.nameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="cost"
                               className="col-sm-6 col-form-label">Цена за
                            занятие</label>
                        <input
                            className={"form-control col-sm-6 " + this.generateClassNameByError(this.state.costError)}
                            type="number"
                            placeholder="Цена за занятие"
                            id='cost'
                            min="0"
                            max="10000"
                            // defaultValue={groupById ? groupById.cost : null}
                            value={this.state.cost}
                            onInput={this.handleInput}
                        />
                        <div className="invalid-feedback">
                            <div className="text-right">{this.state.costError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="duration"
                               className="col-sm-6 col-form-label">Продолжительность
                            занятия</label>
                        <input
                            className={"form-control col-sm-6 " + this.generateClassNameByError(this.state.durationError)}
                            type="number"
                            placeholder="Продолжительность (в мин.)"
                            id='duration'
                            // defaultValue={groupById ? groupById.duration : null}
                            value={this.state.duration}
                            onInput={this.handleInput}
                        />
                        <div className="invalid-feedback">
                            <div className="text-right">{this.state.durationError}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}

export default GroupCreatingProfile;