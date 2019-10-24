import React from 'react';
import {connect} from 'react-redux';


const Home = props => (
    <div className="container-fluid">
        <div className="row">
            <div className="main-container_large">
                <h1>Smart Journal</h1>
                <hr/>
                <p>Добро пожаловать в "Smart Journal"!</p>
            </div>
        </div>
    </div>
);

export default connect()(Home);