import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface themeState {
	name: 'light' | 'dark';
}

const initialState: themeState = {
	name: 'light',
};

export const themeSlice = createSlice({
	name: 'themeSlice',
	initialState,
	reducers: {
		changeTheme(state, action: PayloadAction<themeState>) {
			state.name = action.payload.name;
		},
	},
});
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
