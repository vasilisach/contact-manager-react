import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
export type AppDispatch = typeof store.dispatch;