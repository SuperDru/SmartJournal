import React, {Component} from 'react';
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from "react-router-dom";
import '../../../css/NavMenu.css';


export default class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.closeNavbar = this.closeNavbar.bind(this);
        this.state = {
            isOpen: false
        };
    }

    closeNavbar() {
        this.setState({
            isOpen: false
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <header>
                <Navbar className=" navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">SMART JOURNAL</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/payment_management"
                                             onClick={this.closeNavbar}>Управление
                                        платежами</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/statistics"
                                             onClick={this.closeNavbar}>Статистика</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/schedule"
                                             onClick={this.closeNavbar}>Расписание</NavLink>
                                </NavItem>
                                {/*<UncontrolledDropdown nav inNavbar>*/}
                                {/*    <DropdownToggle nav caret>*/}
                                {/*        Schedule*/}
                                {/*    </DropdownToggle>*/}
                                {/*    <DropdownMenu right>*/}
                                {/*        <DropdownItem tag={Link} className="text-dark" to='/schedule/true_schedule'>*/}
                                {/*            True Schedule*/}
                                {/*        </DropdownItem>*/}
                                {/*        <DropdownItem tag={Link} className="text-dark" to='/schedule/week_schedule'>*/}
                                {/*            Week Schedule*/}
                                {/*        </DropdownItem>*/}
                                {/*        <DropdownItem divider/>*/}
                                {/*        <DropdownItem tag={Link} className="text-dark" to="/schedule">*/}
                                {/*            Schedules*/}
                                {/*        </DropdownItem>*/}
                                {/*    </DropdownMenu>*/}
                                {/*</UncontrolledDropdown>*/}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/groups"
                                             onClick={this.closeNavbar}>Группы</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/users"
                                             onClick={this.closeNavbar}>Студенты</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
