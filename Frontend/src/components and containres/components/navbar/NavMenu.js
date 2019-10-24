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
import classNames from "classnames"
// import

export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            // fixed: "top",
            visible: true,
            prevScrollY: window.pageYOffset,
        };
        this.toggle = this.toggle.bind(this);
        this.closeNavbar = this.closeNavbar.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    // Adds an event listener when the component is mount.
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    // Remove the event listener when the component is unmount.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    // Hide or show the menu.
    handleScroll = () => {
        const {prevScrollY} = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollY > currentScrollPos;

        // console.log("pageY", window.pageYOffset);
        // console.log(prevScrollY);

        this.setState({
            prevScrollY: currentScrollPos + 0.6,
            visible
        });
    };

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
        // const opacity = Math.min(100 / this.state.currentScrollHeight, 1)
        const clsName = this.state.visible ? "active" : "hidden";
        return (
            <header className="">
                <Navbar fixed="top"
                        className={"navbar-expand-md navbar-toggleable-md border-bottom box-shadow " + clsName}
                        light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">SMART JOURNAL</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-md-inline-flex flex-md-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/payment_management"
                                             onClick={this.closeNavbar}>Посещаемость</NavLink>
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
