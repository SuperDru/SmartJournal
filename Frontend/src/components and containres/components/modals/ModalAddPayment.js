import React, {Component} from "react"
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";


class ModalAddPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            sum: null
        };
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log("receive props");
        // console.log(nextProps);
        this.setState({
            modal: nextProps.isOpen,
            // newStartTime: nextProps.oldStartTime,
            // toDelete: nextProps.toDelete
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.modal !== prevState.modal) {
            // this.props.paymentModalCallback(this.state.sum);
            this.props.paymentModalToggle(this.state.modal);
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onChange(e) {
        this.setState({sum: e.target.value})
    }

    onSave() {
        this.props.paymentModalCallback(this.state.sum);
        this.toggle()
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Добавление платежа</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="startTime">Введите нужную сумму в рублях</Label>
                            <Input type="number" id="startTime" onChange={this.onChange}
                                // defaultValue={this.props.oldStartTime}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSave}>Сохранить</Button>
                        <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalAddPayment;