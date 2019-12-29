import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import React, {ReactElement} from 'react';

interface IProps {
    id: string;
    menuItems: ISimpleMenuItem[];
    toggler: ReactElement;
    menuProps?: MenuProps;
}

export interface ISimpleMenuItem {
    id: string;
    label: string | ReactElement;
    onClick: (data: any) => any;
    data?: any;
    disabled?: boolean;
}

export default ({id, toggler, menuItems, menuProps}: IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const menuItemClick = (item: ISimpleMenuItem) => (event: React.MouseEvent<HTMLElement>) => {
        item.onClick(item.data);
        handleClose(event);
    };

    const renderMenuItem = (item: ISimpleMenuItem) => (
        <MenuItem
            key={item.id}
            onClick={menuItemClick(item)}
            disabled={item.disabled}>
            {item.label}
        </MenuItem>
    );

    return (
        <>
            <div
                aria-controls={`simple-menu-${id}`}
                aria-haspopup="true"
                onClick={handleClick}>
                {toggler}
            </div>
            <Menu
                id={`simple-menu-${id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                {...menuProps}>
                {_.map(menuItems, renderMenuItem)}
            </Menu>
        </>
    );
}

