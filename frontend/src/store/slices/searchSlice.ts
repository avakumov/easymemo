import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchState {
	commonTextSearch: string;
}

const initialState: searchState = {
	commonTextSearch: '',
};

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeSearch(state, action: PayloadAction<string>) {
			state.commonTextSearch = action.payload;
		},
	},
});
export const { changeSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
