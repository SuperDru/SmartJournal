import React, {Component} from "react"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


class ModalAskSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            // nestedModal: false,
            closeAll: false,
            toDelete: false
        };

        this.toggle = this.toggle.bind(this);
        // this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log("receive props");
        this.setState({modal: nextProps.isOpen})
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.modals !== prevState.modals) {
    //         // this.props.getNewScheduleDay(this.state.newSchedule);
    //         this.props.toggleCallback(this.state.modals, this.state.closeAll, this.state.toDelete);
    //     }
    // }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleAll() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            closeAll: true,
            toDelete: true
        }))
    }

    render() {
        return (
            <Modal isOpen={this.state.modal}
                   toggle={this.toggle}
                   onClosed={this.state.closeAll ? () => this.props.toggleCallback(this.state.modal, this.state.closeAll, this.state.toDelete)
                       : undefined}>
                <ModalHeader>Внимание!</ModalHeader>
                <ModalBody>
                    <h6>Вы уверены, что хотите удалить этот день из расписания?</h6>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={this.toggleAll}
                    >Да</Button>
                    <Button color="secondary"
                            onClick={this.toggle}
                    >Нет</Button>
                </ModalFooter>
            </Modal>
        )
    }

}


export default ModalAskSchedule