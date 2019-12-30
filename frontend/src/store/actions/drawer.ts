import { createAction } from 'redux-act';
import {IDrawerStore} from '../reducers/drawerReducer';

export const setState = createAction<IDrawerStore['isOpen']>('SET_DRAWER_STATE');
