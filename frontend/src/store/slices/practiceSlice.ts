import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeState {
	openFilterModal: boolean;
	filter: {
		count: number;
		categories: string[];
	};
}

const initialState: PracticeState = {
	openFilterModal: false,
	filter: {
		count: 10,
		categories: [],
	},
};

export const practiceSlice = createSlice({
	name: 'practiceSlice',
	initialState,
	reducers: {
		openPracticeFilterModal(state) {
			state.openFilterModal = true;
		},
		closePracticeFilterModal(state) {
			state.openFilterModal = false;
		},
		setPracticeFilter(state, action: PayloadAction<Pick<PracticeState, 'filter'>>) {
			state.filter = action.payload.filter;
		},
	},
});
export const { openPracticeFilterModal, closePracticeFilterModal, setPracticeFilter } = practiceSlice.actions;

export const practiceReducer = practiceSlice.reducer;
