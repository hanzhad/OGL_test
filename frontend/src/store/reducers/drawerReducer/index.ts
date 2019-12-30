import { createReducer } from 'redux-act';
import { setState } from '../../actions';
import { IDrawerStore } from './types';

const initialState: IDrawerStore = {
  isOpen: false,
};

const reducer = createReducer({}, initialState);

reducer.on(setState, (state: IDrawerStore, data: IDrawerStore['isOpen']) => ({
  ...state,
  isOpen: data,
}));

export default reducer;

export {
  IDrawerStore
}
