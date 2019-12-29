import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';

const drawerWidth = 360;

interface IProps {
    children: any,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            flexShrink: 0,
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
    }),
);

export default (props : IProps) => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            {props.children}
            <Divider />
        </Drawer>
    );
};
