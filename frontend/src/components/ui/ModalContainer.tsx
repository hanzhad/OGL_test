import Modal from '@material-ui/core/Modal';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import classNames from 'classnames';
import clsx from 'clsx';
import _ from 'lodash';
import React, {ReactElement} from 'react';


export interface IModalContainer {
    modalClassName?: string;
    size?: string;
    isActive?: boolean;
    styles?: any;
    onClose?: () => any;
    children?: ReactElement;
}

function getModalStyle() {
    return {
        left: `${50}%`,
        top: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}

const modalStyles = makeStyles( (theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
            borderRadius: theme.spacing(1),
            boxShadow: theme.shadows[5],
            outline: 'none',
            position: 'absolute',
            width: '100%',
            maxWidth: theme.spacing(50)
        },
        paperSm: {
            maxWidth: theme.spacing(40)
        },
        paperLg: {
            maxWidth: theme.spacing(60)
        },
        paperXl: {
            maxWidth: theme.spacing(80)
        },
        paperXxl: {
            maxWidth: theme.spacing(100)
        },
        paperXxxl: {
            maxWidth: theme.spacing(120)
        },
    }));

export default (props: IModalContainer) => {
    const classes = modalStyles();

    const { isActive = false, onClose, children, modalClassName, styles, size } = props;

    return (
        <Modal
            open={isActive}
            onClose={onClose}>
            <div
                style={getModalStyle()}
                className={getClassName(modalClassName)}>
                {children}
            </div>
        </Modal>
    );

    function getClassName(...rest: any[]) {
        let className = classNames(clsx(classes.paper, {
            [classes.paperLg]: size === 'lg',
            [classes.paperSm]: size === 'sm',
            [classes.paperXl]: size === 'xl',
            [classes.paperXxl]: size === 'xxl',
            [classes.paperXxxl]: size === 'xxxl',
        }), 'sst-modal');
        _.forEach({ ...styles, ...rest }, (i) => className = classNames(className, i));
        return className;
    }
};
