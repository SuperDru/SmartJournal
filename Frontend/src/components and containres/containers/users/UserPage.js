import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Loading from "../../../rubbish/Loading";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {UserPaymentHistory} from "../../components/users/UserPaymentHistory";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {UserPageProfile} from "../../components/users/UserPageProfile";
import ModalWarning from "../../components/modals/ModalWarning";
import {Link} from "react-router-dom";
import Spinner from "../../components/other/Spinner";
import {accountHistoryActionCreators} from "../../../store/redux/account history/actionCreators";
import ModalAddPayment from "../../components/modals/ModalAddPayment";

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWarningOpen: false,
            warningMessage: String(),
            warningDeleteUser: false,
            warningDeletePayment: false,
            isPaymentModalOpen: false,
            paymentAction: false,
            paymentsOfUser: new Map(),
            accountHistoryStep: 1
        };
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.paymentModalToggle = this.paymentModalToggle.bind(this);
        this.paymentModalCallback = this.paymentModalCallback.bind(this);
        this.addPayment = this.addPayment.bind(this);
    }

    componentDidMount() {
        this.props.getUserById(this.props.userId);
        let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
        let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
        this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
        this.props.getAccountHistoryByStep(this.props.userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.user.isLoaded) {
            this.props.getUserById(this.props.userId);
        }
        // if (this.state.paymentAction) {
        //     this.props.getAccountHistory(this.props.userId);
        //     this.setState({paymentAction: false})
        // }

        // if (!this.props.payments.isLoaded) {
        //     this.props.getAccountHistory(this.props.userId);
        //     dispatch({type: "GET_PAYMENTS_SUCCEEDED"})
        // }

        // if (this.props.payments.newPaymentId !== prevProps.payments.newPaymentId) {
        //     this.props.getAccountHistoryByStep(this.props.userId);
        // }

        if (this.props.payments !== prevProps.payments) {
            let tempMap = new Map();
            this.props.payments.payments.forEach(value => tempMap.set(value.id, {
                payday: value.payday,
                amount: value.amount
            }));
            this.setState({paymentsOfUser: tempMap});
        }

        console.log("loaded", this.props.payments.isLoaded);
        if (!this.props.payments.isLoaded && this.props.payments.isLoaded !== prevProps.payments.isLoaded) {
            let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
            let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
            this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
            this.props.getAccountHistoryByStep(this.props.userId);
        }
    }

    warningToggle(isOpen) {
        this.setState({
            isWarningOpen: isOpen,
            warningDeletePayment: isOpen,
            warningDeleteUser: isOpen,
        })
    }

    warningCallback(value) {
        if (value) {
            if (this.state.warningDeletePayment) {
                this.props.cancelPayment(this.props.userId, this.state.paymentId);
                // this.setState({warningDeletePayment: false})
            } else if (this.state.warningDeleteUser) {
                this.props.deleteUser(this.props.userId);
                this.props.history.goBack();
                // this.setState({warningDeleteUser: false})
            }
        }
    }

    paymentModalToggle(isOpen) {
        this.setState({isPaymentModalOpen: isOpen});
    }

    paymentModalCallback(value) {
        console.log(value);
        if (value) {
            this.props.addPayment(this.props.userId, {
                amount: value,
                payday: new Date().toISOString()
            });
            // if (!this.props.payments.error) {
            //     this.setState({paymentAction: true})
            // }
        }
    }

    addPayment(userId) {
        this.setState({isPaymentModalOpen: true, userId: userId});
    }

    getAccountHistory() {
        this.props.getAccountHistoryByStep(this.props.userId, this.state.accountHistoryStep);
        this.setState({accountHistoryStep: this.state.accountHistoryStep + 1})
    }

    onDelete(paymentId) {
        // this.props.cancelPayment(this.props.userId, paymentId);
        this.setState({
            isWarningOpen: true,
            warningDeletePayment: true,
            paymentId: paymentId,
            warningMessage: "Вы уверены, что хотите удалить платеж?",
        })
    }

    onDeleteUser() {
        this.setState({
            isWarningOpen: true,
            warningDeleteUser: true,
            // paymentId: paymentId,
            warningMessage: "Вы уверены, что хотите удалить пользователя? Вся информация о нем станет недоступна.",
        })
    }

    onEditUser() {
        this.props.editUser(this.props.userId);
    }

    render() {
        console.log("state", this.state);
        console.log("props", this.props);
        return (
            <div className="container-fluid">
                <div className="main-container">
                    <ModalWarning warningMessage={this.state.warningMessage} isOpen={this.state.isWarningOpen}
                                  warningToggle={this.warningToggle}
                                  warningCallback={this.warningCallback}/>
                    <ModalAddPayment isOpen={this.state.isPaymentModalOpen}
                                     paymentModalCallback={this.paymentModalCallback}
                                     paymentModalToggle={this.paymentModalToggle}/>
                    <div className="user-page__info">
                        <h4 className="main-container__header">Страница ученика</h4>
                        <hr/>
                        <h6 className="col-xs-2 col-form-label">Основная информация</h6>
                        {this.props.user.userById ?
                            <div>
                                <UserPageProfile userById={this.props.user.userById}/>
                                <div>
                                    <button className="btn btn-outline-danger"
                                            onClick={this.onDeleteUser}>
                                        <span className="oi oi-trash"/>
                                    </button>
                                    <Link to={`/users/edit_user/user_${this.props.userId}`}
                                          className="btn btn-outline-warning"
                                          onClick={this.props.onEditUser}><span className="oi oi-pencil"/></Link>
                                    <button className="btn btn-outline-info"
                                            onClick={this.addPayment}>
                                        <span className="oi oi-dollar"/>
                                        Внести платёж
                                    </button>
                                </div>
                            </div> : <Spinner/>}
                        <hr/>
                        <h6 className="col-xs-2 col-form-label">История платежей студента</h6>
                        {this.props.accountHistory.isLoaded ?
                            <UserPaymentHistory payments={this.state.paymentsOfUser}
                                                accountHistory={this.props.accountHistory.userAccountHistory}
                                                onDelete={this.onDelete.bind(this)}
                                                getMoreHistory={this.getAccountHistory.bind(this)}/> : <Spinner/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            user: state.user,
            payments: state.payments,
            accountHistory: state.accountHistory
        }
    },
    dispatch => bindActionCreators(
        Object.assign({}, paymentsActionCreators, userActionCreators, accountHistoryActionCreators),
        dispatch)
)(UserPage);