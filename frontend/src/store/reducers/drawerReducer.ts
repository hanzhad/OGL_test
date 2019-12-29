// @ts-nocheck
import { createReducer } from 'redux-act';
import { setState } from '../actions';

const initialState = {
  isOpen: [],
};

export default createReducer({
  [setState]: (state, data) => ({
    ...state,
    isOpen: data,
  }),
}, initialState);
