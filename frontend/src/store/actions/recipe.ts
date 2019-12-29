import {createAction} from 'redux-act';
import {ICategory} from '../reducers/categoryReducer';
import {IRecipe} from '../reducers/recipeReducer';

export const getRecipeAction = createAction('GET_RECIPE_ACTION');
export const getRecipeByIdAction = createAction<IRecipe['_id']>('GET_RECIPE_BY_ID_ACTION');
export const getRecipeByCategoryIdAction = createAction<ICategory['_id']>('GET_RECIPE_BY_CATEGORY_ID_ACTION');
export const createRecipeAction = createAction<IRecipe>('CREATE_RECIPE_ACTION');
export const deleteRecipeAction = createAction<IRecipe['_id']>('DELETE_RECIPE_ACTION');
export const updateRecipeAction = createAction<IRecipe>('UPDATE_RECIPE_ACTION');

