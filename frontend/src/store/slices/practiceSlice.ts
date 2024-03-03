import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeState {
	openFilterModal: boolean;
	filter: {
		count: number;
		categories: string[];
		enabled: boolean;
	};
	successCount: number;
	allCount: number;
}

const initialState: PracticeState = {
	openFilterModal: false,
	filter: {
		count: 10,
		categories: [],
		enabled: false,
	},
	successCount: 0,
	allCount: 0,
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
		setPracticeSuccessCount(state, action: PayloadAction<number>) {
			state.successCount = action.payload;
		},
		setPracticeAllCount(state, action: PayloadAction<number>) {
			state.allCount = action.payload;
		},
		enablePracticeFilter(state) {
			state.filter.enabled = true;
		},
		disablePracticeFilter(state) {
			state.filter.enabled = false;
		},
	},
});
export const {
	openPracticeFilterModal,
	closePracticeFilterModal,
	setPracticeFilter,
	setPracticeSuccessCount,
	setPracticeAllCount,
	enablePracticeFilter,
	disablePracticeFilter,
} = practiceSlice.actions;

export const practiceReducer = practiceSlice.reducer;
