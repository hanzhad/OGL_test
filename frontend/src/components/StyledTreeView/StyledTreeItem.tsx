import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {SvgIconProps} from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert'
import TreeItem, {TreeItemProps} from '@material-ui/lab/TreeItem';
import React from 'react';
import SimpleMenu, {ISimpleMenuItem} from '../ui/SimpleMenu';

declare module 'csstype' {
    interface Properties {  // tslint:disable-line:interface-name
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    nodeId: string;
    bgColor?: string;
    color?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelText: string;
    menuItems: ISimpleMenuItem[];
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightBold,
            },
            borderBottomRightRadius: theme.spacing(2),
            borderTopRightRadius: theme.spacing(2),
            color: theme.palette.text.secondary,
            fontWeight: theme.typography.fontWeightMedium,
            paddingRight: theme.spacing(1),
        },
        expanded: {},
        group: {
            '& $content': {
                paddingLeft: theme.spacing(0.5),
            },
            marginLeft: theme.spacing(0),
        },
        label: {
            display: 'flex',

            color: 'inherit',
            fontWeight: 'inherit',

        },
        labelIcon: {
            marginRight: theme.spacing(0.5),
        },
        labelRoot: {
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            padding: theme.spacing(0.5, 0),
            justifyContent: 'space-between',
        },
        labelWrapper: {
            display: 'flex',
        },
        labelText: {
            fontWeight: 'inherit',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: 'none',
            maxWidth: theme.spacing(28),
        },
        root: {
            '&:focus > $content': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
                color: 'var(--tree-view-color)',
            },
            color: theme.palette.text.secondary,
        },
    }),
);

export default (props: StyledTreeItemProps) => {
    const classes = useTreeItemStyles();
    const {menuItems, nodeId, labelText, labelIcon: LabelIcon, color, bgColor, ...other} = props;

    return (
        <TreeItem
            nodeId={nodeId}
            label={
                <div className={classes.labelRoot}>
                    <div className={classes.labelWrapper}>
                        <LabelIcon color="inherit" className={classes.labelIcon} />
                        <Typography variant="body2" className={classes.labelText}>
                            {labelText}
                        </Typography>
                    </div>
                    <SimpleMenu
                        id={nodeId}
                        toggler={<IconButton size='small'><MoreVert fontSize='small' /></IconButton>}
                        menuItems={menuItems}
                    />
                </div>
            }
            style={{
                '--tree-view-bg-color': bgColor,
                '--tree-view-color': color,
            }}
            classes={{
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
                root: classes.root,
            }}
            {...other}
        />
    );
}
