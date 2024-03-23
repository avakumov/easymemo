import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MessageTypes = 'error' | 'warning' | 'info' | 'success' | undefined;

type MessageState = {
	message: string;
	type?: MessageTypes;
	open: boolean;
};

const initialState: MessageState = {
	message: '',
	type: 'info',
	open: false,
};

export const messageSlice = createSlice({
	name: 'messageSlice',
	initialState,
	reducers: {
		changeMessage(state, action: PayloadAction<MessageState>) {
			state.message = action.payload.message;
			state.type = action.payload.type ?? state.type;
			state.open = action.payload.open;
		},
		showMessage(state, action: PayloadAction<Omit<MessageState, 'open'>>) {
			state.message = action.payload.message;
			state.type = action.payload.type ?? state.type;
			state.open = true;
		},
	},
});

export const { changeMessage, showMessage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
