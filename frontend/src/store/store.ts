import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '../services/ApiService';
import { formEntityModalReducer } from './slices/FormEntityModalSlice';
import { messageReducer } from './slices/messageSlice';
import { paginatorReducer } from './slices/paginatorSlice';
import { practiceReducer } from './slices/practiceSlice';
import { searchReducer } from './slices/searchSlice';

const rootReducer = combineReducers({
	formEntityModal: formEntityModalReducer,
	message: messageReducer,
	practice: practiceReducer,
	search: searchReducer,
	paginator: paginatorReducer,
	[api.reducerPath]: api.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
