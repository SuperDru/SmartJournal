import React from 'react';
import {connect} from 'react-redux';


const Home = props => (
    <div>
        <h1>Smart Journal</h1>
        <p>Добро пожаловать в "Smart Journal"!</p>
    </div>
);

export default connect()(Home);