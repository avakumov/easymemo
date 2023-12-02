import axios from 'axios';
import { IQuestion } from '../../types';
import { AppDispatch } from '../store';
import { questionsSlice } from './QuestionsSlice';

export const fetchQuestions = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(questionsSlice.actions.fetchQuestions());
		const response = await axios.get<IQuestion[]>('http://localhost:8001/questions');
		dispatch(questionsSlice.actions.fetchQuestionsSuccess(response.data));
	} catch (e) {
		if (e instanceof Error) {
			dispatch(questionsSlice.actions.fetchQuestionsError(e.message));
		}
	}
};
