import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators1 from "./tableReducer";
// import * as actionCreators from "../store/tableReducer"

//import * as actionCreators2 from "../store/formReducer"
import "../css/MainTable.css"

class MainTable extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            date: '',
            groupId: '',
            tableDays: '',
            attend: []
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadUserDays = this.loadUserDays.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.editUserDays = this.editUserDays.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.initUserDays = this.initUserDays.bind(this);
        this.setData = this.setData.bind(this);
    }

    onSubmit(event) { // do not rerender component without pressing
        event.preventDefault();
        // this.onDateChange(event);
        this.props.initGroups();
        console.log(this.props.groups);
    }

    setData() {
        let key = this.state.groupId;
        //console.log(this.props.groups.get(key));
        const weekSchedule = this.props.groups.get(key).weekSchedule.days;
        //console.log(weekSchedule);
        const tempDate = new Date(this.state.date);
        const year = tempDate.getUTCFullYear();
        const month = tempDate.getUTCMonth() + 1;
        const currentMonth = new Date(year, month);
        const nextMonth = new Date(year, month + 1);
        const quantityOfDays = (nextMonth - currentMonth) / (1000 * 3600 * 24);
        let tableDays = [];
        let tempStr = year + "-"
            + (Math.floor(month / 10)).toString()
            + (month % 10).toString()
            + "-";
        for (let i = 1; i <= quantityOfDays; i++) {
            let temp = tempStr
                + (Math.floor(i / 10)).toString()
                + (i % 10).toString() + "T00:00:00";
            let day = new Date(temp).getUTCDay();
            if (weekSchedule[day]) {
                tableDays.push(i);
            }
        }
        this.setState({
            year: year,
            month: month,
            tableDays: tableDays
        });
        console.log(this.state.year);
        console.log(this.state.month);
        console.log(this.state.tableDays);
    }

    onEdit(event) {
        event.preventDefault();
        this.props.editGroups();
    }

    onDateChange(event) {
        //this.props.setDate;
        this.setState({date: event.target.value});
        // this.dataHandler();
    }


    onGroupChange(event) {
        //console.log(event.target.value);
        this.setState({groupId: event.target.value});
        //this.dataHandler();
        //this.props.setGroupId(event)
    }

    // componentWillReceiveProps() {
    //     console.log('willMount');
    //     if (this.props.isLoaded)
    //         this.setData();
    // }


    loadUserDays(usDate, currDate) {
        //console.log("LOAD");
        const date = new Date(this.state.date);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const diff = currDate;
        let size = usDate.length;
        const attend = [];
        for (let i = 0; i < size; i++) {
            let temp = new Date(usDate[i].date);
            if ((temp.getFullYear() === year) && (temp.getUTCMonth() === month)) {
                attend.push(temp.getUTCDate() + 1);
            }
        }

        let output = [];
        for (let i = 0; i < diff; i++) {
            if (i % 2 !== 0) {
                output.push((attend.indexOf(i) !== -1) ?
                    <td key={i}>Б</td> : <td key={i}>Н</td>);
            }
        }
        return output;
    }

    initUserDays(attendance, userId) {
        let key = this.state.groupId;
        //console.log(this.props.groups.get(key));
        const weekSchedule = this.props.groups.get(key).weekSchedule.days;
        //console.log(weekSchedule);
        const tempDate = new Date(this.state.date);
        const year = tempDate.getUTCFullYear();
        const month = tempDate.getUTCMonth() + 1;
        const currentMonth = new Date(year, month);
        const nextMonth = new Date(year, month + 1);
        const quantityOfDays = (nextMonth - currentMonth) / (1000 * 3600 * 24);
        let tableDays = [];
        let tempStr = year + "-"
            + (Math.floor(month / 10)).toString()
            + (month % 10).toString()
            + "-";
        for (let i = 1; i <= quantityOfDays; i++) {
            let temp = tempStr
                + (Math.floor(i / 10)).toString()
                + (i % 10).toString() + "T00:00:00";
            let day = new Date(temp).getUTCDay();
            if (weekSchedule[day]) {
                tableDays.push(i);
            }
        }
        //console.log("tableDays: ", tableDays);
        let size = attendance.length;
        const attend = [];
        for (let i = 0; i < size; i++) {
            let temp = new Date(attendance[i].date);
            if ((temp.getFullYear() === year) && (temp.getUTCMonth() + 1 === month)) {
                attend.push(temp.getUTCDate() + 1);
            }
        }
        // console.log("attendance: ", attend);
        // this.setState({attend:attend});
        let n = tableDays.length;
        // console.log("n: ", n);
        let output = [];
        for (let i = 0; i < n; i++) {
            // console.log(tableDays[i]);
            output.push((attend.indexOf(tableDays[i]) !== -1) ?
                <td key={i}>Б</td> : <td key={i}>Н</td>);
        }
        return output;
    }

    editUserDays(attendance, userId) {
        console.log("EDIT");
        let key = this.state.groupId;
        //console.log(this.props.groups.get(key));
        const weekSchedule = this.props.groups.get(key).weekSchedule.days;
        //console.log(weekSchedule);
        const tempDate = new Date(this.state.date);
        const year = tempDate.getUTCFullYear();
        const month = tempDate.getUTCMonth() + 1;
        const currentMonth = new Date(year, month);
        const nextMonth = new Date(year, month + 1);
        const quantityOfDays = (nextMonth - currentMonth) / (1000 * 3600 * 24);
        let tableDays = [];
        let tempStr = year + "-"
            + (Math.floor(month / 10)).toString()
            + (month % 10).toString()
            + "-";
        for (let i = 1; i <= quantityOfDays; i++) {
            let temp = tempStr
                + (Math.floor(i / 10)).toString()
                + (i % 10).toString() + "T00:00:00";
            let day = new Date(temp).getUTCDay();
            if (weekSchedule[day]) {
                tableDays.push(i);
            }
        }

        let size = attendance.length;
        let attend = [];
        for (let i = 0; i < size; i++) {
            let temp = new Date(attendance[i].date);
            if ((temp.getFullYear() === year) && (temp.getUTCMonth() + 1 === month)) {
                attend.push(temp.getUTCDate() + 1);
            }
        }
        // console.log("attendance: ", attend);
        let n = tableDays.length;
        let output = [];
        for (let i = 0; i < n; i++) {
            // console.log(tableDays[i]);
            output.push((attend.indexOf(tableDays[i]) !== -1) ? <td key={i}>
                <form className='form__'>
                    <input
                        className='input__'
                        defaultValue='Б'
                        name="name"
                        id={userId + "-" + i}
                    /></form>
            </td> : <td key={i}>
                <form className='form__'>
                    <input
                        className='input__'
                        defaultValue='Н'
                        name="name"
                        id={userId + "-" + i}
                    /></form>
            </td>);
        }
        return output;
    }

    onSave(event) {
        console.log("SAVE");
        event.preventDefault();
        // let size = this.props.users.length;
        let key = this.state.groupId;
        // let numOfGroups=this.props.groups.length;
        let size = this.props.groups.get(key).users.length;
        // console.log(size);
        for (let i = 0; i < size; i++) {
            // this.props.users[i].accountAmount = document.getElementsByName('amount')[i].value;
            // this.props.users[i].dept = document.getElementsByName('dept')[i].value;
            const date = new Date(this.state.date);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;

            let size1 = this.props.groups.get(key).users[i].user.attendance.length;
            // console.log(size1);
            const attend = [];
            for (let j = 0; j < size1; j++) {
                let temp = new Date(this.props.groups.get(key).users[i].user.attendance[j].date);
                console.log("temp-date", temp);
                if ((temp.getUTCFullYear() === year) && (temp.getUTCMonth() + 1 === month)) {
                    attend.push(temp.getUTCDate() + 1);
                }
            }

            let k = 0;
            const size = getMonthDays(this.state.date);
            for (k; k < size; k++) {
                let j = k % 2;
                if (j !== 0) {
                    let id = this.props.groups.get(key).users[i].user.id + "-" + k.toString();
                    let temp = document.getElementById(id).value;
                    if (temp === 'Б' &&
                        attend.indexOf(k) === -1) {
                        let day = year.toString() + "-"
                            + (Math.floor(month / 10)).toString()
                            + (month % 10).toString()
                            + "-" + (Math.floor(k / 10)).toString()
                            + (k % 10).toString() + "T00:00:00";
                        this.props.groups.get(key).user.attendance.push({date: day});
                    }
                }
            }
        }
        this.props.saveData();
    }

    renderTableHead() {
        let key = this.state.groupId;
        //console.log(this.props.groups.get(key));
        const weekSchedule = this.props.groups.get(key).weekSchedule.days;
        //console.log(weekSchedule);
        const tempDate = new Date(this.state.date);
        const year = tempDate.getUTCFullYear();
        const month = tempDate.getUTCMonth() + 1;
        const currentMonth = new Date(year, month);
        const nextMonth = new Date(year, month + 1);
        const quantityOfDays = (nextMonth - currentMonth) / (1000 * 3600 * 24);
        let table = [];
        let tempStr = year + "-"     //date format: "2018-08-06T00:00:00"
            + (Math.floor(month / 10)).toString()
            + (month % 10).toString()
            + "-";
        for (let i = 1; i <= quantityOfDays; i++) {
            let temp = tempStr
                + (Math.floor(i / 10)).toString()
                + (i % 10).toString() + "T00:00:00";
            let day = new Date(temp).getUTCDay();
            if (weekSchedule[day]) {
                table.push(<th key={i}>{i}</th>);
            }
        }
        return table;
    }

    renderTableBody() {
        let key = this.state.groupId;
        return (
            <tbody>
            {this.props.groups.get(key).users.map(user => (
                <tr key={user.userId}>
                    <td>{user.user.name}</td>
                    {!this.props.isEdit ?
                        this.initUserDays(user.user.attendance, user.user.id) :
                        this.editUserDays(user.user.attendance, user.user.id)}
                    <td>{user.user.account.amount}</td>
                    {/*<td>{user.user.account.dept}</td>*/}
                </tr>
            ))}
            </tbody>
        );
    }

    render() {
        console.log('render');
        console.log(this.props.isEdit);
        // if (this.props.isLoaded) {
        //     this.dataHandler();
        // }
        return (
            <div>
                <h1>Smart Journal</h1>
                <div className="header__chose">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleMonth">Месяц</label>
                            <input
                                type="month"
                                className="form-control"
                                id="exampleMonth"
                                aria-describedby="monthHelp"
                                placeholder="Введите месяц"
                                value={this.state.date}
                                onChange={this.onDateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleGroup">№ Группы</label>
                            <input type="number"
                                   className="form-control"
                                   id="exampleGroup"
                                   aria-describedby="groupHelp"
                                   placeholder="Введите № группы"
                                   value={this.state.groupId}
                                   onChange={this.onGroupChange}
                            />
                        </div>
                        <button
                            onClick={this.onSubmit}
                            type="submit"
                            className="btn btn-primary"
                        >Принять
                        </button>
                        <button
                            onClick={this.onEdit}
                            type="redact"
                            className="btn btn-info"
                        >Редактировать таблицу
                        </button>
                        {this.props.isEdit ?
                            <button
                                onClick={this.onSave}
                                type="save"
                                className="btn btn-success"
                            >Сохранить
                            </button> : null
                        }
                    </form>
                </div>
                {this.props.isLoaded ?
                    <table className='table table-striped'>
                        <thead>
                        <tr>
                            <th>Name</th>
                            {this.renderTableHead()}
                            {/*{this.setData()}*/}
                            <th>Amount</th>
                            <th>Dept</th>
                        </tr>
                        </thead>
                        {this.renderTableBody()}
                    </table>
                    : null
                }
            </div>
        )
    }
}


// class FetchData extends Component {
//
//     constructor(props, ctx) {
//         super(props, ctx);
//         this.state = {date: ''};
//
//         //this.onLoginChange = this.onLoginChange.bind(this);
//         //this.onPasswordChange = this.onPasswordChange.bind(this);
//         //this.onSubmit = this.onSubmit.bind(this);
//         this.onDateChange = this.onDateChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.loadUserDays = this.loadUserDays.bind(this);
//         this.onEdit = this.onEdit.bind(this);
//         this.editUserDays = this.editUserDays.bind(this);
//         this.onSave = this.onSave.bind(this);
//     }
//
//     ensureDataFetched() {
//         //this.props.initUsers();
//     }
//
//     onSubmit(event) { // do not rerender component without pressing
//         event.preventDefault();
//        // this.onDateChange(event);
//         this.props.initUsers();
//     }
//
//     onEdit(event) {
//         event.preventDefault();
//         this.props.editUsers();
//     }
//
//     onSave(event) {
//         console.log("SAVE");
//         event.preventDefault();
//         let size = this.props.users.length;
//         for (let i = 0; i < size; i++) {
//             this.props.users[i].userProfile.name = document.getElementsByName('userName')[i].value;
//             this.props.users[i].accountAmount = document.getElementsByName('amount')[i].value;
//             this.props.users[i].dept = document.getElementsByName('dept')[i].value;
//             const date = new Date(this.state.date);
//             const year = date.getUTCFullYear();
//             const month = date.getUTCMonth() + 1;
//
//             let size1 = this.props.users[i].userDays.length;
//             const attend = [];
//             for (let j = 0; j < size1; j++) {
//                 let temp = new Date(this.props.users[i].userDays[j].date);
//                 if ((temp.getUTCFullYear() === year) && (temp.getUTCMonth() + 1 === month)) {
//                     attend.push(temp.getUTCDate() + 1);
//                 }
//             }
//
//             let k = 0;
//             const size = getMonthDays(this.state.date);
//             for (k; k < size; k++) {
//                 let j = k % 2;
//                 if (j !== 0) {
//                     let id = this.props.users[i].id + "-" + k.toString();
//                     let temp = document.getElementById(id).value;
//                     if (temp === 'Б' &&
//                         attend.indexOf(k) === -1) {
//                         let day = year.toString() + "-"
//                             + (Math.floor(month / 10)).toString()
//                             + (month % 10).toString()
//                             + "-" + (Math.floor(k / 10)).toString()
//                             + (k % 10).toString() + "T00:00:00";
//                         this.props.users[i].userDays.push({date: day});
//                     }
//                 }
//             }
//         }
//         this.props.saveData();
//     }
//
//     onDateChange(event) {
//         this.setState({date: event.target.value});
//     }
//
//     loadUserDays(usDate, currDate) {
//         //console.log("LOAD");
//         const date = new Date(this.state.date);
//         const year = date.getUTCFullYear();
//         const month = date.getUTCMonth();
//         const diff = currDate;
//         let size = usDate.length;
//         const attend = [];
//         for (let i = 0; i < size; i++) {
//             let temp = new Date(usDate[i].date);
//             if ((temp.getFullYear() === year) && (temp.getUTCMonth() === month)) {
//                 attend.push(temp.getUTCDate()+1);
//             }
//         }
//
//         let output = [];
//         for (let i = 0; i < diff; i++) {
//             if (i % 2 !== 0) {
//                 output.push((attend.indexOf(i) !== -1) ?
//                     <td key={i}>Б</td> : <td key={i}>Н</td>);
//             }
//         }
//         return output;
//     }
//
//     editUserDays(usDate, currDate, usId) {
//         //console.log("EDIT");
//         const date = new Date(this.state.date);
//         const year = date.getUTCFullYear();
//         const month = date.getUTCMonth();
//         const diff = currDate;
//         let size = usDate.length;
//         const attend = [];
//         for (let i = 0; i < size; i++) {
//             let temp = new Date(usDate[i].date);
//             if ((temp.getFullYear() === year) && (temp.getUTCMonth() === month)) {
//                 attend.push(temp.getUTCDate() + 1);
//             }
//         }
//         //console.log(attend);
//         let output = [];
//         let j = 0;
//         for (let i = 0; i < diff; i++) {
//             j = i % 2;
//             if (j !== 0) {
//                 let id = i.toString();
//                 //console.log(id);
//                 output.push((attend.indexOf(i) !== -1) ? <td key={i}>
//                     <form className='form__'>
//                         <input
//                             className='input__'
//                             defaultValue='Б'
//                             name="name"
//                             id={usId + "-" + id}
//                         /></form>
//                 </td> : <td key={i}>
//                     <form className='form__'>
//                         <input
//                             className='input__'
//                             defaultValue='Н'
//                             name="name"
//                             id={usId + "-" + id}
//                         /></form>
//                 </td>);
//             }
//         }
//         return output;
//     }
//
//     render() {
//         console.log('render');
//         const currDate = getMonthDays(this.state.date);
//         let tab = [];
//         for (let i = 0; i < currDate; i++) {
//             if (i % 2 !== 0) {
//                 tab.push(<th key={i}>{i}</th>);
//             }
//         }
//         return (
//             <div>
//                 <h1>Smart Journal</h1>
//                 <div className="header__chose">
//                     <form>
//                         <div className="form-group">
//                             <label htmlFor="exampleMonth">Месяц</label>
//                             <input
//                                 type="month"
//                                 className="form-control"
//                                 id="exampleMonth"
//                                 aria-describedby="monthHelp"
//                                 placeholder="Введите месяц"
//                                 value={this.state.date}
//                                 onChange={this.onDateChange}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="exampleGroup">№ Группы</label>
//                             <input type="number" className="form-control" id="exampleGroup" aria-describedby="groupHelp"
//                                    placeholder="Введите № группы"/>
//                         </div>
//                         <button
//                             onClick={this.onSubmit}
//                             type="submit"
//                             className="btn btn-primary"
//                         >Принять
//                         </button>
//                         <button
//                             onClick={this.onEdit}
//                             type="redact"
//                             className="btn btn-info"
//                         >Редактировать таблицу
//                         </button>
//                         {this.props.isEdit ?
//                             <button
//                                 onClick={this.onSave}
//                                 type="save"
//                                 className="btn btn-success"
//                             >Сохранить
//                             </button> : null
//                         }
//                     </form>
//                 </div>
//                 {this.props.isLoaded ?
//                     <table className='table table-striped'>
//                         <thead>
//                         <tr>
//                             <th>Name</th>
//                             {tab}
//                             <th>Amount</th>
//                             <th>Dept</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {
//                             !this.props.isEdit ?
//                                 this.props.users.map(user => (
//                                     <tr key={user.id}>
//                                         <td>{user.userProfile.name}</td>
//                                         {this.loadUserDays(user.userDays, currDate)}
//                                         <td>{user.accountAmount}</td>
//                                         <td>{user.dept}</td>
//                                     </tr>)
//                                 ) : (
//                                     this.props.users.map(user => (
//                                         <tr key={user.id}>
//                                             <td>
//                                                 <form>
//                                                     <input
//                                                         defaultValue={user.userProfile.name}
//                                                         name="userName"
//                                                         className="input"
//                                                     /></form>
//                                             </td>
//                                             {this.editUserDays(user.userDays, currDate, user.id)}
//                                             <td>
//                                                 <form>
//                                                     <input
//                                                         defaultValue={user.accountAmount}
//                                                         name="amount"
//                                                         className="input"
//                                                     />
//                                                 </form>
//                                             </td>
//                                             <td>
//                                                 <form>
//                                                     <input
//                                                         defaultValue={user.dept}
//                                                         name="dept"
//                                                         className="input"
//                                                     />
//                                                 </form>
//                                             </td>
//                                         </tr>))
//                                 )
//                         }
//                         </tbody>
//                     </table>
//                     : null
//                 }
//             </div>
//         )
//     }
// }

function getMonthDays(date){
    const tempDate = new Date(date);
    const year = tempDate.getUTCFullYear();
    const month = tempDate.getUTCMonth();
    const currentMonth = new Date(year, month);
    const nextMonth = new Date(year, month + 1);
    return (nextMonth - currentMonth) / (1000 * 3600 * 24);
}


export default connect(
    state => state.tableGroups,
   // state => state.form,
    dispatch => bindActionCreators(actionCreators1.actionCreators, dispatch),
   // dispatch => bindActionCreators(actionCreators2.actionCreators, dispatch)
)(MainTable);


// function renderForm(props) {
//     return (
//         <div className="header__chose">
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="exampleMonth">Месяц</label>
//                     <input
//                         type="month"
//                         className="form-control"
//                         id="exampleMonth"
//                         aria-describedby="monthHelp"
//                         placeholder="Введите месяц"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleGroup">№ Группы</label>
//                     <input type="number" className="form-control" id="exampleGroup" aria-describedby="groupHelp"
//                            placeholder="Введите № группы"/>
//                 </div>
//                 <button
//                     type="submit"
//                     className="btn btn-primary"
//                 >Принять
//                 </button>
//             </form>
//         </div>
//     )
// }
//
// function renderTable(state,props) {
//     const date = new Date(state.date);
//     const year = date.getUTCFullYear();
//     const month = date.getUTCMonth();
//     const currentMonth = new Date(year, month);
//     const nextMonth = new Date(year, month + 1);
//     const diff = (nextMonth - currentMonth) / (1000 * 3600 * 24);
//     let tab = [];
//     for (let i = 0; i < diff; i++) {
//         tab.push(<th>{i + 1}</th>);
//     }
//     //console.log(month);
//     // console.log(diff);
//
//     console.log('render');
//     return (
//         <table className='table table-striped'>
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 {tab}
//             </tr>
//             </thead>
//             <tbody>
//             {props.users.map(user =>
//                 <tr key={user.userProfile.name}>
//                     <td>{user.userProfile.name}</td>
//                     {validateUserDays(user.userDays)}
//                     {/*user.userDays.date.map(function (date) {
//                     const tempDate=new Date(date);
//                     const day=tempDate.getUTCDay();
//                         return <td>{tab[date.</td>
//                     })*/}
//                 </tr>
//             )}
//             </tbody>
//         </table>
//     );
//
//     function validateUserDays(date) {
//         //const tempDate=new Date(date);
//         // const tempMonth= tempDate.getUTCMonth();
//         const attend = date.map(function (date) {
//             let temp = new Date(date.date);
//             if ((temp.getFullYear() === year) && (temp.getUTCMonth() === month))
//                 return temp.getUTCDate();
//         });
//         console.log(attend);
//         let output = [];
//         // console.log(tempMonth);
//         for (let i = 0; i < diff; i++) {
//             output.push((attend.indexOf(i) !== -1) ? <td>Б</td> : <td>Н</td>);
//         }
//         return output;
//     }
// }
//
// export default connect(
//     state => state.users,
//     dispatch => bindActionCreators(actionCreators, dispatch)
// )(FetchData);


// renderTableSchedule() {
//     let size = this.props.groups.size;
//     // console.log(size);
//     let out = [];
//     for (let i = 1; i <= size; i++) {
//         //console.log(this.props.groups.get(i).weekSchedule.days);
//         console.log(this.props.groups.get(i.toString()));
//         out.push(<tr>
//             <td>{this.props.groups.get(i.toString()).id}</td>
//             {this.props.groups.get(i.toString()).weekSchedule.days !== null ?//week schedule must be not null
//                 this.props.groups.get(i.toString()).weekSchedule.days.map(day => (
//                     day ? <td>+</td> : <td>-</td>
//                 )) : null}
//         </tr>);
//     }
//     return (out);
// }
//
// renderWeekSchedule() {
//     console.log('render-week-schedule');
//     return (
//         this.props.isLoaded ?
//             <table className='table table-striped'>
//                 <thead>
//                 <tr>
//                     <th>Группа</th>
//                     <th>Пн</th>
//                     <th>Вт</th>
//                     <th>Ср</th>
//                     <th>Чт</th>
//                     <th>Пт</th>
//                     <th>Сб</th>
//                     <th>Вс</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {this.renderTableSchedule()}
//                 </tbody>
//             </table> : null)
// }
