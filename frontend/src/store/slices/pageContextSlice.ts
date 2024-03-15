import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageContextType } from '../../types';

const initialState: PageContextType = {
	page: 'home',
};

export const pageContextSlice = createSlice({
	name: 'pageContext',
	initialState,
	reducers: {
		changePageContext(state, action: PayloadAction<PageContextType>) {
			state.page = action.payload.page;
		},
	},
});
export const { changePageContext } = pageContextSlice.actions;

export const pageContextReducer = pageContextSlice.reducer;
