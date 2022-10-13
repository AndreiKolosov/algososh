import { rootReducer } from '../services/store/reducer';
import { setupStore } from '../services/store/store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
