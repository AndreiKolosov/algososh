import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; 
import { rootReducer } from './reducer';
import{ rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
    devTools: true,
  });


const store = setupStore();
sagaMiddleware.run(rootSaga);

export default store;
