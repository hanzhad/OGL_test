import { createAction } from 'redux-act';
import {ICategory} from '../reducers/categoryReducer';

export const getCategoriesAction = createAction('GET_CATEGORIES_ACTION');
export const createCategoryAction = createAction<ICategory>('CREATE_CATEGORY_ACTION');
export const deleteCategoryAction = createAction<ICategory['_id']>('DELETE_CATEGORY_ACTION');
export const updateCategoryAction = createAction<ICategory>('UPDATE_CATEGORY_ACTION');
export const getCategoryParentListAction = createAction<ICategory['_id']>('GET_CATEGORY_PARENT_LIST_ACTION');

