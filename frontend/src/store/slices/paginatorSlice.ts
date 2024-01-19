import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import settings from '../../settings';

interface PaginatorState {
	perPage: number;
	currentPage: number;
}

const initialState: PaginatorState = {
	perPage: settings.lists.PER_PAGE,
	currentPage: 1,
};

export const paginatorSlice = createSlice({
	name: 'paginatorSlice',
	initialState,
	reducers: {
		resetPage(state) {
			state.currentPage = 1;
		},
		setPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
	},
});
export const { resetPage, setPage } = paginatorSlice.actions;

export const paginatorReducer = paginatorSlice.reducer;
