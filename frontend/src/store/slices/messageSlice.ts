import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface messageState {
	message: string;
	type?: 'error' | 'warning' | 'info' | 'success';
	open: boolean;
}

const initialState: messageState = {
	message: '',
	type: 'info',
	open: false,
};

export const messageSlice = createSlice({
	name: 'messageSlice',
	initialState,
	reducers: {
		changeMessage(state, action: PayloadAction<messageState>) {
			state.message = action.payload.message;
			state.type = action.payload.type ?? state.type;
			state.open = action.payload.open;
		},
		showMessage(state, action: PayloadAction<Omit<messageState, 'open'>>) {
			state.message = action.payload.message;
			state.type = action.payload.type ?? state.type;
			state.open = true;
		},
	},
});
export const { changeMessage, showMessage } = messageSlice.actions;

export default messageSlice.reducer;
