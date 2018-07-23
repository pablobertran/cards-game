import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Aux from './hoc/Aux/Aux';
import Layout  from './containers/Layout/Layout';


class App extends Component {
    render() {
        return (
            <Layout></Layout>
        );
    }
}

export default App;
