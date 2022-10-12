import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
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


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
