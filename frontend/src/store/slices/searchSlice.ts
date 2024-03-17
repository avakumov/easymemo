import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchState {
	searchText: string;
}

const initialState: searchState = {
	searchText: '',
};

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeInputSearch(state, action: PayloadAction<string>) {
			state.searchText = action.payload;
		},
	},
});
export const { changeInputSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
