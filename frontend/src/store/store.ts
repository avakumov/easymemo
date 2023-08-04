import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '../services/ApiService';
import questionsReducer from './reducers/QuestionsSlice';

const rootReducer = combineReducers({
	questionsReducer,
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
