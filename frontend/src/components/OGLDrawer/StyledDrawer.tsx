import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import {Theme, withStyles} from '@material-ui/core/styles';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../store/actions';
import {IStores} from '../../store/reducers';
import {IDrawerStore} from '../../store/reducers/drawerReducer';

const drawerWidth = 360;

interface IProps extends IDrawerStore{
    children: any,
    classes: any;
    setDrawerState: (state: IDrawerStore['isOpen']) => any;
}

const styles = (theme: Theme) => ({
    drawer: {
        flexShrink: 0,
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
});

class StyledDrawer extends Component<IProps> {

    public render() {
        const {classes, children, isOpen} = this.props;

        return (
           <>
              <Hidden only={['sm', 'xs']}>
                  <Drawer
                      className={classes.drawer}
                      variant="permanent"
                      classes={{
                          paper: classes.drawerPaper,
                      }}
                  >
                      <div className={classes.toolbar} />
                      {children}
                      <Divider />
                  </Drawer>
              </Hidden>
              <Hidden only={['md', 'lg', 'xl']}>
                  <Drawer
                      className={classes.drawer}
                      variant="persistent"
                      anchor="left"
                      open={isOpen}
                      classes={{
                          paper: classes.drawerPaper,
                      }}
                  >
                      <div className={classes.toolbar} />
                      {children}
                      <Divider />
                  </Drawer>
              </Hidden>
           </>
        );
    }
}

const mapStateToProps = (store: IStores) => ({
    isOpen: store.drawerStore.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setDrawerState: (state: IDrawerStore['isOpen']) => dispatch(actions.setState(state)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(StyledDrawer))
