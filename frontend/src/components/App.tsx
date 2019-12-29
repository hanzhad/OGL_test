import CssBaseline from '@material-ui/core/CssBaseline';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainLayout from './MainLayout';
import OGLAppBar from './OGLAppBar';
import OGLDrawer from './OGLDrawer';

class App extends Component {

    public render() {

        return (
            <Router>
                <CssBaseline />
                <Route component={OGLAppBar}/>
                <Route component={OGLDrawer}/>
                <Route exact={true} path='/category/:id?' component={OGLDrawer}/>
                <MainLayout />
            </Router>
        );
    }
}

export default App;
