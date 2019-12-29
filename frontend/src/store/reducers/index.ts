import {combineReducers} from 'redux';
import articleStore, {IArticleStore} from './articleReducer';
import categoryStore, {ICategoryStore} from './categoryReducer';
import drawerStore from './drawerReducer';
import recipeStore, {IRecipeStore} from './recipeReducer';

const reducer = combineReducers({
  articleStore,
  categoryStore,
  drawerStore,
  recipeStore,
});

export default reducer;

export interface IStores {
  articleStore: IArticleStore;
  categoryStore: ICategoryStore;
  recipeStore: IRecipeStore;
  drawerStore: any;
}
