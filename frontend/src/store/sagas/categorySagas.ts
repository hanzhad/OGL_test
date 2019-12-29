import axios from 'axios';
import _ from 'lodash';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {apiUrl} from '../../api/baseUrl';
import * as actions from '../actions';
import {
    addCategoryAction,
    editCategoryAction,
    ICategory,
    removeCategoryAction,
    setCategoriesAction,
    setCategoriesParentListAction
} from '../reducers/categoryReducer';

function* getAll() {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/category`);
        yield put(setCategoriesAction(data));
    } catch (e) {
        console.error(e);
    }
}

function* getParentList({payload}: { payload: ICategory['_id'] }) {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/category/list/${payload}`);
        yield put(setCategoriesParentListAction(data));
    } catch (e) {
        console.error(e);
    }
}

function* create({payload}: { payload: ICategory }) {
    try {
        const {data} = yield call(axios.post, `${apiUrl}/category`, payload);
        yield put(addCategoryAction(data))

    } catch (e) {
        console.error(e);
    }
}

function* remove({payload}: { payload: ICategory['_id'] }) {
    try {
        const {data} = yield call(axios.delete, `${apiUrl}/category/${payload}`);
        yield put(removeCategoryAction(data))

    } catch (e) {
        console.error(e);
    }
}

function* update({payload}: { payload: ICategory }) {
    try {
        const {data} = yield call(axios.put, `${apiUrl}/category/${_.get(payload, '_id')}`, payload);
        yield put(editCategoryAction(data))

    } catch (e) {
        console.error(e);
    }
}

export default function* sagas() {
    yield all([
        takeLatest(actions.getCategoriesAction, getAll),
        takeLatest(actions.createCategoryAction, create),
        takeLatest(actions.deleteCategoryAction, remove),
        takeLatest(actions.updateCategoryAction, update),
        takeLatest(actions.getCategoryParentListAction, getParentList),
    ]);
}
