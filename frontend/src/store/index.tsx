import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from '../components/App';
import rootReducer from './reducers';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagas);

export default (props: any) => (
    <Provider store={store}>
        <App {...props} />
    </Provider>
);
