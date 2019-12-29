import AppBar from '@material-ui/core/AppBar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
    }),
);

export default () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap={true}>
                    Clipped drawer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
