import {fork} from 'redux-saga/effects';
import article from './articleSagas';
import category from './categorySagas';
import recipe from './recipeSagas';

export default function* rootSaga() {
  yield fork(recipe);
  yield fork(article);
  yield fork(category);
}
