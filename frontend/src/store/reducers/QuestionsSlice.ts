import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from '../../models/IQuestion';

interface QuestionsState {
	questions: IQuestion[];
	isLoading: boolean;
	error: string;
}

const initialState: QuestionsState = {
	questions: [],
	isLoading: false,
	error: '',
};

export const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		fetchQuestions(state) {
			state.isLoading = true;
		},
		fetchQuestionsSuccess(state, action: PayloadAction<IQuestion[]>) {
			state.isLoading = false;
			state.error = '';
			state.questions = action.payload;
		},
		fetchQuestionsError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default questionsSlice.reducer;
