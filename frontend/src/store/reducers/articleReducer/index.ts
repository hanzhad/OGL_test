import _ from 'lodash';
import {createAction, createReducer} from 'redux-act';
import {IArticle, IArticleStore} from './types';

const initialState: IArticleStore = {
  articles: [],
};

const reducer = createReducer<IArticleStore>({}, initialState);

export const setArticlesAction = createAction<IArticle[]>('SET_ARTICLES_ACTION');
reducer.on(setArticlesAction, (state, data) => ({
  ...state,
  articles: data,
}));

export const addArticleAction = createAction<IArticle>('ADD_ARTICLE_ACTION');
reducer.on(addArticleAction, (state, data) => ({
  ...state,
  articles: [data, ...state.articles],
}));

export const removeArticleAction = createAction<IArticle>('REMOVE_ARTICLE_ACTION');
reducer.on(removeArticleAction, (state: IArticleStore, data: IArticle) => ({
  ...state,
  articles: _.filter(state.articles, (x) => _.get(x, '_id') !== _.get(data, '_id')),
}));

export const editArticleAction = createAction<IArticle>('EDIT_ARTICLE_ACTION');
reducer.on(editArticleAction, (state: IArticleStore, data: IArticle) => ({
  ...state,
  articles: _.map(state.articles, (x) => {
    if ( _.get(x, '_id') === _.get(data, '_id')) {
      return data;
    }
    return x;
  }),
}));

export default reducer;

export {
  IArticleStore,
  IArticle
}
