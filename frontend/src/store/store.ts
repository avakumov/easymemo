import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '../services/ApiService';
import { filtersReducer } from './slices/filtersSlice';
import { formEntityModalReducer } from './slices/FormEntityModalSlice';
import { messageReducer } from './slices/messageSlice';
import { paginatorReducer } from './slices/paginatorSlice';
import { practiceReducer } from './slices/practiceSlice';
import { searchReducer } from './slices/searchSlice';
import { pageContextReducer } from './slices/pageContextSlice';

const rootReducer = combineReducers({
	formEntityModal: formEntityModalReducer,
	message: messageReducer,
	practice: practiceReducer,
	search: searchReducer,
	paginator: paginatorReducer,
	filters: filtersReducer,
	pageContext: pageContextReducer,
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
