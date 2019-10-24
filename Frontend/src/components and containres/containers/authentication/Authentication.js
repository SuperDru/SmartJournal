import React, {Component} from "react"

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null
        }
        this.getPassword = this.getPassword.bind(this);
    }

    getPassword(value) {
        this.setState({password: value})
    }

    render() {
        return (<div>

        </div>)
    }
}