import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React, {ChangeEvent} from 'react';
import ModalContainer, {IModalContainer} from './ModalContainer';

export interface IField {
    id: string;
    autoFocus?: boolean;
    multiline?: boolean;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type IFormModal = IModalContainer & {
    onSave?: (data: any) => any;
    onClose?: () => any;
    header?: string;
    data?: any;
    fields?: IField[];
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            margin: theme.spacing(0, 3),
        },
        body: {
            padding: theme.spacing(2, 3)
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: theme.spacing(1, 0)
        },
        field: {
            margin: theme.spacing(1, 0),
        },
    }),
);

export default (props: IFormModal) => {
    const classes = useTreeItemStyles();

    const { isActive, onSave, header, onClose, data, fields } = props;

    const onSubmit = () => {
        if (_.isFunction(onSave)) {
            onSave(data);
        }
        if (_.isFunction(onClose)) {
            onClose();
        }
    };

    return (
        <ModalContainer isActive={isActive} onClose={onClose}>
            <form onSubmit={onSubmit} >
                <Typography className={classes.label} variant='h6'>{header}</Typography>
                <Divider />
                <Container className={classes.body}>
                    {_.map(fields, (f: IField) => {
                        const { autoFocus, label, onChange, multiline, id} = f;

                        return (
                            <TextField
                                className={classes.field}
                                fullWidth={true}
                                key={id}
                                name={id}
                                rows={4}
                                value={_.get(data, id)}
                                multiline={multiline}
                                autoFocus={autoFocus}
                                label={label}
                                onChange={onChange}
                            />
                        )
                    })}
                </Container>
                <Divider />
                <Container className={classes.footer}>
                    <Button onClick={onClose}>Close</Button>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
                </Container>
            </form>
        </ModalContainer>
    )
};
