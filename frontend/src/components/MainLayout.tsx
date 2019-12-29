import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ArticlePage from './ArticlePage';
import CategoryPage from './CategotyPage';
import RecipePage from './RecipePage';

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
                <Route exact={true} path='/article/:id' component={ArticlePage}/>
                <Route exact={true} path='/recipe/:id' component={RecipePage}/>
            </Switch>
        </div>
    )

}
