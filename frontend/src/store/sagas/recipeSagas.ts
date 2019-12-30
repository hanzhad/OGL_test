import axios from 'axios';
import _ from 'lodash';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {apiUrl} from '../../api/baseUrl';
import * as actions from '../actions';
import {ICategory} from '../reducers/categoryReducer';
import {
    addRecipeAction, editRecipeAction, IRecipe, removeRecipeAction, setRecipeAction,
    setRecipesAction
} from '../reducers/recipeReducer';
import * as Toast from '../../utils/Tosts/Toast';

function* getAll() {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/recipe`);
        yield put(setRecipesAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* getById({payload}: { payload: IRecipe['_id'] }) {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/recipe/${payload}`);
        yield put(setRecipeAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* getByCategoryId({payload}: { payload: ICategory['_id'] }) {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/recipe/list/${payload}`);
        yield put(setRecipesAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* create({payload}: { payload: IRecipe }) {
    try {
        const {data} = yield call(axios.post, `${apiUrl}/recipe`, payload);
        yield put(addRecipeAction(data))
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* remove({payload}: { payload: IRecipe['_id'] }) {
    try {
        const {data} = yield call(axios.delete, `${apiUrl}/recipe/${payload}`);
        yield put(removeRecipeAction(data))
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* update({payload}: { payload: IRecipe }) {
    try {
        const {data} = yield call(axios.put, `${apiUrl}/recipe/${_.get(payload, '_id')}`, payload);
        yield put(editRecipeAction(data));
        yield put(setRecipeAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

export default function* sagas() {
    yield all([
        takeLatest(actions.getRecipeAction, getAll),
        takeLatest(actions.getRecipeByIdAction, getById),
        takeLatest(actions.getRecipeByCategoryIdAction, getByCategoryId),
        takeLatest(actions.createRecipeAction, create),
        takeLatest(actions.deleteRecipeAction, remove),
        takeLatest(actions.updateRecipeAction, update),
    ]);
}