import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CategoryPage from './CategotyPage';

const modalStyles = makeStyles( (theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 360,
        }
    }));


export default () => {
    const classes = modalStyles();

    return (
        <div className={classes.root} >
            <Toolbar />
            <Switch>
                <Redirect exact={true} from='/' to='/category'/>
                <Route exact={true} path='/category/:id?' component={CategoryPage}/>
            </Switch>
        </div>
    )

}
