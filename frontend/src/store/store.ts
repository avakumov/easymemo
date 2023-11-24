import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '../services/ApiService';
import questionsReducer from './reducers/QuestionsSlice';
import formEntityModalReducer from './reducers/FormEntityModalReducer';
import themeReducer from './reducers/themeActions';
import messageReducer from './reducers/messageActions';

const rootReducer = combineReducers({
	questionsReducer,
	formEntityModalReducer,
	theme: themeReducer,
	message: messageReducer,
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
