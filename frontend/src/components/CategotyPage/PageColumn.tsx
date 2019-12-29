import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {AddCircle} from '@material-ui/icons';
import _ from 'lodash';
import React from 'react';

interface IColumn {
    header: string;
    actionButton: {
        disabled?: boolean;
        onClick: (event: React.MouseEvent<HTMLElement>) => void;
    }
    fields: any[];
    fieldsMap:  Array<{ key: string; name: string }>;
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
    }),
);

export default (props: IColumn) => {
    const classes = useStyles();
    const { header, fields, fieldsMap, actionButton } = props;

    const renderItem = (map: IColumn['fieldsMap']) => (item: any) =>  (
        <Card className={classes.card} key={_.get(item, '_id')}>
            <CardContent>
                {_.map(map, (f) => (
                    <div className={classes.cardHeader} key={f.key}>
                        <Typography className={classes.subT} variant='subtitle2'
                                    color='initial'>{f.name}</Typography>
                        <Typography variant='body1' color='primary'>{_.get(item, f.key)}</Typography>
                    </div>
                ))}
                <div className={classes.cardFooter}>
                    <Button color="primary">Learn More</Button>
                </div>
            </CardContent>
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
