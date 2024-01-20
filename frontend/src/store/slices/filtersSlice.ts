import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filtersState {
	questions: {
		filter: {
			categories: string[];
		};
		isOpenModal: boolean;
	};
}

const initialState: filtersState = {
	questions: {
		filter: {
			categories: [],
		},
		isOpenModal: false,
	},
};

export const filtersSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		setQuestionsFilter(state, action: PayloadAction<{ categories: string[] }>) {
			state.questions.filter = action.payload;
		},
		resetQuestionsFilter(state) {
			state.questions.filter = { categories: [] };
		},
		openQuestionsFilterModal(state) {
			state.questions.isOpenModal = true;
		},
		closeQuestionsFilterModal(state) {
			state.questions.isOpenModal = false;
		},
	},
});
export const { setQuestionsFilter, openQuestionsFilterModal, closeQuestionsFilterModal } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
