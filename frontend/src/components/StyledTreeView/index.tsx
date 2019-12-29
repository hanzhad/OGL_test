import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeView, {TreeViewProps} from '@material-ui/lab/TreeView';
import React from 'react';

interface IProps extends TreeViewProps {
    children?: any,
}

const useStyles = makeStyles( (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
            maxWidth: theme.spacing(41),

        },
    }),
);

export default (props: IProps) => {
    const classes = useStyles();
    const { children, ...rest} = props;
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            {...rest}
        >
            {children}
        </TreeView>
    );
}
