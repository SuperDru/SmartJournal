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

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWarningOpen: false,
            warningMessage: String(),
            warningDeleteUser: false,
            warningDeletePayment: false
        };
        this.warningToggle = this.warningToggle.bind(this);
        this.warningCallback = this.warningCallback.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
    }

    componentDidMount() {
        this.props.getUserById(this.props.userId);
        let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
        let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
        this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.user.isLoaded) {
            this.props.getUserById(this.props.userId);
        }
        if (!this.props.payments.isLoaded) {
            let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
            let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
            this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
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
            <div className="container">
                <ModalWarning warningMessage={this.state.warningMessage} isOpen={this.state.isWarningOpen}
                              warningToggle={this.warningToggle}
                              warningCallback={this.warningCallback}/>
                <div className="user-page__info">
                    <h4>Страница ученика</h4>
                    {this.props.user.userById ?
                        <div>
                            <UserPageProfile userById={this.props.user.userById}
                                // onDeleteUser={this.onDeleteUser}
                                // onEditUser={this.onEditUser.bind(this)}
                                // userId={this.props.userId}
                            />
                            <button className="btn btn-outline-danger"
                                    onClick={this.onDeleteUser}>Удалить
                            </button>
                            <Link to={`/users/edit_user/user_${this.props.userId}`}
                                  className="btn btn-outline-warning"
                                  onClick={this.props.onEditUser}>Редактировать</Link></div> : <Spinner/>}
                    {this.props.payments.isLoaded ?
                        <UserPaymentHistory payments={this.props.payments.payments}
                                            onDelete={this.onDelete.bind(this)}/>
                        : <Spinner/>}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            user: state.user,
            payments: state.payments
        }
    },
    dispatch => bindActionCreators(
        Object.assign({}, paymentsActionCreators, userActionCreators),
        dispatch)
)(UserPage);