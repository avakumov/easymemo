import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityName } from '../../types';

interface CreateModalState {
	open: boolean;
	name: EntityName;
}

const initialState: CreateModalState = {
	open: false,
	name: undefined,
};

export const createEntityModalSlice = createSlice({
	name: 'createEntityModal',
	initialState,
	reducers: {
		// setDataToModal(state, action: PayloadAction<EditModalData>){
		//     state.data = action.payload
		// },
		// showModal(state, action: PayloadAction<boolean>){
		//     state.open = action.payload
		// },
		createEntityModalOpen(state, action: PayloadAction<CreateModalState>) {
			state.open = action.payload.open;
			state.name = action.payload.name;
		},
		createEntityModalClose(state) {
			state.open = false;
			state.name = undefined;
		},
	},
});
export const { createEntityModalClose, createEntityModalOpen } = createEntityModalSlice.actions;

export default createEntityModalSlice.reducer;
