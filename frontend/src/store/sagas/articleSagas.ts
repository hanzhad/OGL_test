import axios from 'axios';
import _ from 'lodash';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {apiUrl} from '../../api/baseUrl';
import * as Toast from '../../utils/Tosts/Toast';
import * as actions from '../actions';
import {
    addArticleAction, editArticleAction,
    IArticle, removeArticleAction, setArticleAction,
    setArticlesAction
} from '../reducers/articleReducer';
import {ICategory} from '../reducers/categoryReducer';

function* getAll() {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/article`);
        yield put(setArticlesAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* getById({payload}: { payload: IArticle['_id'] }) {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/article/${payload}`);
        yield put(setArticleAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* getByCategoryId({payload}: { payload: ICategory['_id'] }) {
    try {
        const {data} = yield call(axios.get, `${apiUrl}/article/list/${payload}`);
        yield put(setArticlesAction(data));
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* create({payload}: { payload: IArticle }) {
    try {
        const {data} = yield call(axios.post, `${apiUrl}/article`, payload);
        yield put(addArticleAction(data))
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* remove({payload}: { payload: IArticle['_id'] }) {
    try {
        const {data} = yield call(axios.delete, `${apiUrl}/article/${payload}`);
        yield put(removeArticleAction(data))
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

function* update({payload}: { payload: IArticle }) {
    try {
        const {data} = yield call(axios.put, `${apiUrl}/article/${_.get(payload, '_id')}`, payload);
        yield put(editArticleAction(data));
        yield put(setArticleAction(data))
    } catch (e) {
        Toast.errorToast(_.get(e, 'message'));
        console.error(e);
    }
}

export default function* sagas() {
    yield all([
        takeLatest(actions.getArticleAction, getAll),
        takeLatest(actions.getArticleByIdAction, getById),
        takeLatest(actions.getArticleByCategoryIdAction, getByCategoryId),
        takeLatest(actions.createArticleAction, create),
        takeLatest(actions.deleteArticleAction, remove),
        takeLatest(actions.updateArticleAction, update),
    ]);
}
