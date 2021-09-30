import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSaga from 'redux-saga';

import reduce from '../reducers';
import rootSaga from '../saga';

const configureStore = () => {
    const sagaMiddlewares = createSaga();
    const Middlewares = [sagaMiddlewares];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...Middlewares))
    : composeWithDevTools(applyMiddleware(...Middlewares))

    const Store = createStore(reduce, enhancer);
    Store.sagaTask = sagaMiddlewares.run(rootSaga); // serverside rendering

    return Store;
}

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development"
});

export default wrapper;