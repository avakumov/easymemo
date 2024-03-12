import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion, QuestionPracticeType } from '../../types';

interface PracticeState {
	openFilterModal: boolean;
	filter: {
		count: number;
		categories: string[];
		enabled: boolean;
	};
	successCount: number;
	allCount: number;
	questions: any[];
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
	questions: [],
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
		changePracticeInput(state, action: PayloadAction<{ id: number; value: string }>) {
			state.questions = state.questions.map((q) =>
				q.id === action.payload.id ? { ...q, currentAnswer: action.payload.value } : q
			);
		},
		setPracticeQuestions(state, action: PayloadAction<IQuestion[]>) {
			const data = action.payload;
			if (!Array.isArray(data)) return;
			state.questions = data.map((q, index) => ({
				id: q.id,
				question: q.question,
				status: index === 0 ? 'active' : 'wait',
				categories: q.categories,
				answer: q.answer,
				isCurrentCorrect: false,
				currentAnswer: '',
			}));
		},
		setPracticeActive(state, action: PayloadAction<number>) {
			state.questions = state.questions.map((q) => {
				if (q.status === 'active') return { ...q, status: 'wait' };
				if (q.id === action.payload) return { ...q, status: 'active' };
				return q;
			});
		},
		changePracticeQuestion(state, action: PayloadAction<Partial<QuestionPracticeType>>) {
			state.questions = state.questions.map((q) => {
				if (q.id === action.payload.id) return { ...q, ...action.payload };
				return q;
			});
		},
		nextPracticeQuestion(state, action: PayloadAction<{ fromIndex?: number }>) {
			const { fromIndex } = action.payload;
			const { questions } = state;

			/*Переходим к следующему вопросу c активного если если не указан fromIndex или следующий за fromIndex*/
			const activeIndex = fromIndex ?? questions.findIndex((q) => q.status === 'active');

			//переходит на следующий вопрсос ожидающий ответа
			const lastIndex = questions.length - 1;
			let nextQuestionIndex: null | number = null;

			if (activeIndex !== lastIndex) {
				for (let index = activeIndex; index <= lastIndex; index++) {
					if (questions[index] && questions[index].status === 'wait') {
						nextQuestionIndex = index;
						break;
					}
				}
			}
			if (!nextQuestionIndex) {
				for (let index = 0; index < activeIndex; index++) {
					if (questions[index].status === 'wait') {
						nextQuestionIndex = index;
						break;
					}
				}
			}

			if (nextQuestionIndex !== null && Number.isInteger(nextQuestionIndex)) {
				//обновляем текущее положение активного инпута если не задан fromIndex
				if (questions[activeIndex] && fromIndex === undefined) {
					questions[activeIndex].status = 'wait';
				}
				questions[nextQuestionIndex].status = 'active';
			}
		},
		setPracticeCurrentCorrect(state, action: PayloadAction<{ id: number; isCorrect: boolean }>) {
			state.questions = state.questions.map((q) => {
				if (q.id === action.payload.id) return { ...q, isCurrentCorrect: action.payload.isCorrect };
				return q;
			});
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
	changePracticeInput,
	setPracticeQuestions,
	setPracticeActive,
	changePracticeQuestion,
	nextPracticeQuestion,
	setPracticeCurrentCorrect,
} = practiceSlice.actions;

export const practiceReducer = practiceSlice.reducer;
