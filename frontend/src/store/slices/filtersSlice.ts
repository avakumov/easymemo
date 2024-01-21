import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filtersState {
	questions: {
		filter: {
			categories: string[];
		};
		isOpenModal: boolean;
		enabled: boolean;
	};
}

const initialState: filtersState = {
	questions: {
		filter: {
			categories: [],
		},
		isOpenModal: false,
		enabled: false,
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
		enableQuestionsFilter(state) {
			state.questions.enabled = true;
		},
		disableQuestionsFilter(state) {
			state.questions.enabled = false;
		},
	},
});
export const {
	setQuestionsFilter,
	openQuestionsFilterModal,
	closeQuestionsFilterModal,
	disableQuestionsFilter,
	enableQuestionsFilter,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
