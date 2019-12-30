import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Theme, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Menu} from '@material-ui/icons';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../store/actions';
import {IStores} from '../store/reducers';
import {IDrawerStore} from '../store/reducers/drawerReducer';
import Hidden from '@material-ui/core/Hidden';

const styles = (theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    iconButton: {
        margin: theme.spacing(0, 1),
    },
});

interface IProps extends IDrawerStore{
    classes: any;
    setDrawerState: (state: IDrawerStore['isOpen']) => any;
}

class OGLAppBar extends Component<IProps> {

    public changeDrawerState = () => {
        const { setDrawerState, isOpen } = this.props;
        setDrawerState(!isOpen);
    };

    public render() {
        const { classes } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Hidden only={['md', 'lg', 'xl']}>
                        <IconButton color='inherit' className={classes.iconButton} onClick={this.changeDrawerState}>
                            <Menu/>
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" noWrap={true}>
                        Lorem ipsum
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (store: IStores) => ({
    isOpen: store.drawerStore.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setDrawerState: (state: IDrawerStore['isOpen']) => dispatch(actions.setState(state)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OGLAppBar))
