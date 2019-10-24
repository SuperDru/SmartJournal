import React, {Component} from "react"
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

class ModalWarning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            // continue: false
        };
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            modal: nextProps.isOpen,
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.modals !== prevState.modals) {
    //         // this.props.paymentModalCallback(this.state.sum);
    //         // console.log("warning did update");
    //         // console.log(this.state.modals);
    //         this.props.warningToggle(false);
    //     }
    // }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.warningToggle(false);
    }

    onSubmit() {
        this.props.warningCallback(true);
        this.toggle();
    }

    onCancel() {
        this.props.warningCallback(false);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
                    <ModalHeader toggle={this.toggle}>Внимание!</ModalHeader>
                    <ModalBody>
                        <h6>{this.props.warningMessage}</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.onSubmit}>Продолжить</Button>
                        <Button color="secondary" onClick={this.onCancel}>Отмена</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalWarning;