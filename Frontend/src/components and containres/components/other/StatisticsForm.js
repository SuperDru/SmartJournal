// import ModalWarning from "../modals/ModalWarning";
import React, {Component} from "react";

class StatisticsForm extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedMonth: new Date(),
        };
        this.renderForm = this.renderForm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedMonth !== prevState.selectedMonth) {
            this.props.getSelectedDate(this.state.selectedMonth);
        }
    }

    onDateChange(e) {
        // if (this.props.isEdit) {
        this.setState({
            selectedMonth: new Date(e.target.value),
            // isWarningOpen: true
        })
    }

    renderForm() {
        // console.log("form state", this.state);
        return (
            <div className="container">
                {/*<ModalWarning isOpen={this.state.isWarningOpen} warningCallback={this.warningCallback}*/}
                {/*              warningToggle={this.warningToggle} warningMessage={this.state.warningMessage}/>*/}
                <div className="">
                    <div className="">
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
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (<div>
                {this.renderForm()}
            </div>
        )
    }
}

export default StatisticsForm;