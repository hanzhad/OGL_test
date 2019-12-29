import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {AddCircle} from '@material-ui/icons';
import _ from 'lodash';
import React from 'react';
import {CardActionArea} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

interface IColumn {
    header: string;
    onDetailsClick: (item: any) => void;
    actionButton: {
        disabled?: boolean;
        onClick: (event: React.MouseEvent<HTMLElement>) => void;
    }
    fields: any[];
    fieldsMap: Array<{ key: string; name: string }>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        block: {
            flex: 1,
            padding: theme.spacing(1),
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        card: {
            margin: theme.spacing(2, 0),
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'flex-end',
            margin: theme.spacing(1)
        },
        subT: {
            marginRight: theme.spacing(0.5),
        },
        cardFooter: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        labelText: {
            fontWeight: 'inherit',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: 'none',
            maxWidth: 260,
            minWidth: 80,
        },
    }),
);

export default (props: IColumn) => {
    const classes = useStyles();
    const {header, fields, fieldsMap, actionButton, onDetailsClick} = props;

    const renderItem = (map: IColumn['fieldsMap']) => (item: any) => (
        <Card className={classes.card} key={_.get(item, '_id')}>
            <CardActionArea>
                <CardContent>
                    {_.map(map, (f) => (
                        <div className={classes.cardHeader} key={f.key}>
                            <Typography className={classes.subT} variant='body1'
                                        color='initial'>{f.name}</Typography>
                            <Typography className={classes.labelText} variant='body1'
                                        color='primary'>{_.get(item, f.key)}</Typography>
                        </div>
                    ))}
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardFooter}>
                <Button color="primary" onClick={() => onDetailsClick(item)}>Learn More</Button>
            </CardActions>
        </Card>
    );

    return (
        <div className={classes.block}>
            <div className={classes.header}>
                <Typography variant='h6'>{header}</Typography>
                <IconButton {...actionButton}>
                    <AddCircle />
                </IconButton>
            </div>
            {_.map(fields, renderItem(fieldsMap))}
        </div>
    )
}
