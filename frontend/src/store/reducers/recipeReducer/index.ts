import _ from 'lodash';
import {createAction, createReducer} from 'redux-act';
import {IRecipe, IRecipeStore} from './types';

const initialState: IRecipeStore = {
  recipes: [],
};

const reducer = createReducer<IRecipeStore>({}, initialState);

export const setRecipeAction = createAction<IRecipe>('SET_RECIPE_ACTION');
reducer.on(setRecipeAction, (state, data) => ({
  ...state,
  recipe: data,
}));
export const setRecipesAction = createAction<IRecipe[]>('SET_RECIPES_ACTION');
reducer.on(setRecipesAction, (state, data) => ({
  ...state,
  recipes: data,
}));

export const addRecipeAction = createAction<IRecipe>('ADD_RECIPE_ACTION');
reducer.on(addRecipeAction, (state, data) => ({
  ...state,
  recipes: [data, ...state.recipes],
}));

export const removeRecipeAction = createAction<IRecipe>('REMOVE_RECIPE_ACTION');
reducer.on(removeRecipeAction, (state: IRecipeStore, data: IRecipe) => ({
  ...state,
  recipes: _.filter(state.recipes, (x) => _.get(x, '_id') !== _.get(data, '_id')),
}));

export const editRecipeAction = createAction<IRecipe>('EDIT_RECIPE_ACTION');
reducer.on(editRecipeAction, (state: IRecipeStore, data: IRecipe) => ({
  ...state,
  recipes: _.map(state.recipes, (x) => {
    if ( _.get(x, '_id') === _.get(data, '_id')) {
      return data;
    }
    return x;
  }),
}));

export default reducer;

export {
  IRecipeStore,
  IRecipe
}
