import React, {Component} from "react"
import ModalWarning from "../modals/ModalWarning";

class Form extends Component {

    //getSelectedGroupId, getSelectedDate and groups should be passed with props

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date(),
            isWarningOpen: false,
            warningMessage: "Текущие изменения не сохранятся!"
        };
        this.renderForm = this.renderForm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
    }

    // UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    //     if (nextProps.selectedMonth) {
    //         this.setState({selectedMonth: nextProps.selectedMonth});
    //     }
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedGroupId !== prevState.selectedGroupId && this.state.selectedGroupId !== "Выберите группу") {
            this.props.getSelectedGroupId(this.state.selectedGroupId)
        }
        if (this.state.selectedMonth !== prevState.selectedMonth) {
            this.props.getSelectedDate(this.state.selectedMonth);
        }
    }

    warningToggle(isOpen) {
        this.setState({
            isWarningOpen: isOpen
        })
    }


    warningCallback(value) {
        if (value) {
            this.setState({
                selectedMonth: this.state.tempMonth || this.state.selectedMonth,
                selectedGroupId: this.state.tempGroupId || this.state.selectedGroupId,
            });
        }
    }


    onDateChange(e) {
        if (this.props.isEdit) {
            this.setState({
                tempMonth: new Date(e.target.value),
                isWarningOpen: true
            })
        } else this.setState({
            selectedMonth: new Date(e.target.value),
        });
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        if (this.props.isEdit) {
            this.setState({
                tempGroupId: groupId,
                isWarningOpen: true
            })
        } else this.setState({
            selectedGroupId: groupId,
        });
    }

    renderForm() {
        // console.log("form state", this.state);
        return (
            <div className="container-fluid">
                <ModalWarning isOpen={this.state.isWarningOpen} warningCallback={this.warningCallback}
                              warningToggle={this.warningToggle} warningMessage={this.state.warningMessage}/>
                {/*<div className="">*/}
                {/*    <div className="">*/}
                <form>
                    <div className="form-group row">
                        <label htmlFor="exampleMonth" className="col-form-label col-sm-4">Месяц</label>
                        <div className="col-sm-8">
                            <input
                                type="month"
                                className="form-control"
                                id="exampleMonth"
                                aria-describedby="monthHelp"
                                placeholder="Введите месяц"
                                value={this.state.selectedMonth.toISOString().slice(0, 7)}
                                onChange={this.onDateChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="customSelect" className="col-form-label col-sm-4">Группа </label>
                        <div className="col-sm-8">
                            <select className="custom-select form-control"
                                    onChange={this.onSelectGroup}
                                    value={this.state.selectedGroupId || undefined}
                                    id="customSelect">
                                <option value={undefined}>Выберите группу</option>
                                {this.props.groups.map(group => (
                                    <option value={group.guid} key={group.guid}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            // </div>
            // </div>
        )
    }

    render() {
        // console.log("sorry, i am dumb component, my props is", this.props);
        return (<div>
                {this.renderForm()}
            </div>
        )
    }
}

export default Form;
