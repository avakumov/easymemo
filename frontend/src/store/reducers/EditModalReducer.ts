import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityName, IEntity } from '../../types';

interface EditModalState {
	open: boolean;
	name: EntityName;
	data: IEntity;
}

const initialState: EditModalState = {
	open: false,
	name: undefined,
	data: undefined,
};

export const editModalSlice = createSlice({
	name: 'editModal',
	initialState,
	reducers: {
		// setDataToModal(state, action: PayloadAction<EditModalData>){
		//     state.data = action.payload
		// },
		// showModal(state, action: PayloadAction<boolean>){
		//     state.open = action.payload
		// },
		editModalOpen(state, action: PayloadAction<EditModalState>) {
			state.open = action.payload.open;
			state.name = action.payload.name;
			state.data = action.payload.data;
		},
		editModalClose(state) {
			state.open = false;
			state.name = undefined;
			state.data = undefined;
		},
	},
});
export const { editModalOpen, editModalClose } = editModalSlice.actions;

export default editModalSlice.reducer;
