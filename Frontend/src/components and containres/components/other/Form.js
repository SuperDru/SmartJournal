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
            //
            // if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
            //     this.setState({
            //         selectedMonth: new Date(e.target.value),
            //     });
            // }
        } else this.setState({
            selectedMonth: new Date(e.target.value),
        });
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        if (this.props.isEdit) {
            // if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
            //     this.setState({
            //         selectedGroupId: groupId,
            //     });
            // }
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
            <div className="container">
                <ModalWarning isOpen={this.state.isWarningOpen} warningCallback={this.warningCallback}
                              warningToggle={this.warningToggle} warningMessage={this.state.warningMessage}/>
                <div className="form">
                    <div className="main-form">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="exampleMonth" className="label_month col-md-2">Месяц</label>
                                <input
                                    type="month"
                                    className="form-control col-md-7"
                                    id="exampleMonth"
                                    aria-describedby="monthHelp"
                                    placeholder="Введите месяц"
                                    value={this.state.selectedMonth.toISOString().slice(0, 7)}
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="customSelect" className="label_month col-md-2">Группа </label>
                                <select className="custom-select form-control col-md-7"
                                        onChange={this.onSelectGroup}
                                        value={this.state.selectedGroupId || undefined}
                                        id="customSelect">
                                    <option value={undefined}>Выберите группу</option>
                                    {this.props.groups.map(group => (
                                        <option value={group.guid} key={group.guid}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
