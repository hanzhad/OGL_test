import {Container, createStyles, makeStyles, Theme} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React from 'react';
import CollapsedBreadcrumbs from './ui/CollapsedBreadcrumbs';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import {Edit, Delete} from '@material-ui/icons';

interface IProps {
    pageHeader: string;
    onEditClick: () => any;
    onDeleteClick: () => any;
    rows: IRow[];
}

interface IRow {
    key: string;
    title?: string;
    value: string;
    multiline?: boolean;
}

const useStyles = makeStyles( (theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        container: {
            margin: theme.spacing(1, 0),
        },
        oneLine: {
            display: 'flex',
            alignItems: 'flex-end',
        },
        row: {
            margin: theme.spacing(2, 4),
        },
        title: {
            marginRight: theme.spacing(1),
            lineHeight: 'inherit',
        }
    }),
);


export default (props: IProps) => {
    const { pageHeader, rows, onEditClick, onDeleteClick } = props;
    const classes = useStyles();

    const renderRow = (item: IRow) => {
        const { title, value, key, multiline } = item;
        return (
            <div key={key} className={clsx(classes.row, {
                [classes.oneLine]: !multiline,
            })}>
                <Typography className={classes.title} color='primary' variant='h6'>{title}</Typography>
                <Typography>{value}</Typography>
            </div>
        );
    };

    return (
        <Container className={classes.container}>
           <div className={classes.header}>
               <Typography variant='h4'>{pageHeader}</Typography>
               <div >
                   <IconButton onClick={onEditClick}>
                       <Edit/>
                   </IconButton>
                   <IconButton onClick={onDeleteClick}>
                       <Delete/>
                   </IconButton>
               </div>
           </div>
            <Divider />
            <CollapsedBreadcrumbs
                className={classes.container}
            />
            <div>
                {_.map(rows, renderRow)}
            </div>
        </Container>
    )
}
