import {createAction} from 'redux-act';
import {IArticle} from '../reducers/articleReducer';
import {ICategory} from '../reducers/categoryReducer';

export const getArticleAction = createAction('GET_ARTICLE_ACTION');
export const getArticleByIdAction = createAction<IArticle['_id']>('GET_ARTICLE_BY_ID_ACTION');
export const getArticleByCategoryIdAction = createAction<ICategory['_id']>('GET_ARTICLE_BY_CATEGORY_ID_ACTION');
export const createArticleAction = createAction<IArticle>('CREATE_ARTICLE_ACTION');
export const deleteArticleAction = createAction<IArticle['_id']>('DELETE_ARTICLE_ACTION');
export const updateArticleAction = createAction<IArticle>('UPDATE_ARTICLE_ACTION');

