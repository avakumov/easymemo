import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityName, ICategory, IQuestion, IUser } from '../../types';

interface FormEntityModalState {
	open: boolean;
	name: EntityName;
	data?: IQuestion | IUser | ICategory;
}

const initialState: FormEntityModalState = {
	open: false,
	name: undefined,
	data: undefined,
};

export const entityModalSlice = createSlice({
	name: 'createEntityModal',
	initialState,
	reducers: {
		entityModalOpen(state, action: PayloadAction<FormEntityModalState>) {
			state.open = action.payload.open;
			state.name = action.payload.name;
			state.data = action.payload?.data;
		},
		entityModalClose(state) {
			state.open = false;
			state.name = undefined;
			state.data = undefined;
		},
	},
});
export const { entityModalClose, entityModalOpen } = entityModalSlice.actions;

export const formEntityModalReducer = entityModalSlice.reducer;
