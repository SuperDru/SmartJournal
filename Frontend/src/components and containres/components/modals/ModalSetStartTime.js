import React, {Component} from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from "reactstrap";
import ModalAskSchedule from "./ModalAskSchedule";


class ModalSetStartTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newStartTime: null,
            modal: false,
            isNestedModalOpen: false,
            closeAll: false,
            toDelete: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleCallback = this.toggleCallback.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.activeInput = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("receive props");
        console.log(nextProps);
        this.setState({
            modal: nextProps.isOpen,
            oldStartTime: nextProps.oldStartTime,
            // newStartTime: nextProps.oldStartTime,
            toDelete: nextProps.toDelete,
            // closeAll: !nextProps.isOpen
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.modal !== prevState.modal) {
            this.activeInput.focus();
            if (this.state.closeAll) {
                if (this.state.newStartTime) {
                    this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
                } else {
                    this.props.getNewStartTime({newStartTime: this.state.oldStartTime, toDelete: this.state.toDelete});
                }
                this.props.toggleCallback(this.state.modal);
                // this.setState({closeAll:!this.state.closeAll});
            } else if (this.state.toDelete) {
                if (this.state.newStartTime) {
                    this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
                } else {
                    this.props.getNewStartTime({newStartTime: this.state.oldStartTime, toDelete: this.state.toDelete});
                }
                // this.props.toggleCallback(this.state.modals);
            }
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            // closeAll: prevState.closeAll
        }));
    }

    toggleCallback(isOpen, closeAll, toDelete) {
        // console.log(isOpen, closeAll, toDelete);
        this.setState({
            isNestedModalOpen: isOpen,
            modal: !closeAll,
            toDelete: toDelete,
            // closeAll: closeAll
        });
    }

    onChange(e) {
        this.setState({newStartTime: e.target.value});
    }

    onSave() {
        // console.log("onSave", this.state);
        this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
        this.toggle();
    }

    onDelete() {
        this.setState({isNestedModalOpen: true})
    }

    render() {
        // console.log(this.props);
        // console.log("modals state", this.state);
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}
                // onClosed={this.state.closeAll ? this.toggle : undefined}
            >
                <ModalHeader toggle={this.toggle}>Время занятия</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="startTime">Введите время начала занятия</Label>
                        <Input type="time" id="startTime" onChange={this.onChange}
                               defaultValue={this.props.oldStartTime}
                               innerRef={input => {
                                   this.activeInput = input
                               }}/>
                    </FormGroup>
                    {this.props.oldStartTime ?
                        <Button color="danger" onClick={this.onDelete}>Удалить из расписания</Button> : null}
                    <ModalAskSchedule isOpen={this.state.isNestedModalOpen} toggleCallback={this.toggleCallback}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Сохранить</Button>
                    <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalSetStartTime