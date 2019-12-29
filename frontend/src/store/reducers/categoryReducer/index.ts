import _ from 'lodash';
import {createAction, createReducer} from 'redux-act';
import {ICategory, ICategoryStore} from './types';

const initialState = {
    categories: [],
    parentList: [],
};

const reducer = createReducer<ICategoryStore>({}, initialState);

export const setCategoriesAction = createAction<ICategory[]>('SET_CATEGORIES_ACTION');
reducer.on(setCategoriesAction, (state, data) => ({
    ...state,
    categories: data,
}));

export const setCategoriesParentListAction = createAction<ICategory[]>('SET_CATEGORIES_PARENT_LIST_ACTION');
reducer.on(setCategoriesParentListAction, (state, data) => ({
    ...state,
    parentList: data,
}));

export const addCategoryAction = createAction<ICategory>('ADD_CATEGORY_ACTION');
reducer.on(addCategoryAction, (state, data) => ({
    ...state,
    categories: [...state.categories, data],
}));

export const removeCategoryAction = createAction<ICategory>('REMOVE_CATEGORY_ACTION');
reducer.on(removeCategoryAction, (state: ICategoryStore, data: ICategory) => ({
    ...state,
    categories: _.filter(state.categories, (x) => _.get(x, '_id') !== _.get(data, '_id')),
}));

export const editCategoryAction = createAction<ICategory>('EDIT_CATEGORY_ACTION');
reducer.on(editCategoryAction, (state: ICategoryStore, data: ICategory) => ({
    ...state,
    categories: _.map(state.categories, (x) => {
        if (_.get(x, '_id') === _.get(data, '_id')) {
            return data;
        }
        return x;
    }),
}));

export default reducer;

export {
    ICategoryStore,
    ICategory
}
