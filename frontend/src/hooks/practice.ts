import React from 'react';
import { useEffect } from 'react';
import { useStateCallback } from '.';
import api from '../services/ApiService';

type UsePratice = {
	categories: string[];
	count: number;
};
export type QuestionType = {
	id: number;
	question: string;
	status: 'active' | 'wait' | 'fail' | 'success';
	categories: {
		id: number;
		name: string;
	}[];
	ref: React.RefObject<HTMLInputElement>;
	answer?: string;
	correctAnswer?: string;
};

export function usePratice(filter: UsePratice) {
	const { data } = api.useGetPracticeQuery(filter);
	const [checkAnswerBackend] = api.useCheckAnwerMutation();

	const [questions, setQuestions] = useStateCallback<QuestionType[]>([]);

	useEffect(() => {
		if (Array.isArray(data)) {
			setQuestions(
				data.map((q, index) => ({
					id: q.id,
					question: q.question,
					status: index === 0 ? 'active' : 'wait',
					categories: q.categories,
					ref: React.createRef(),
					answer: q.answer,
				}))
			);
		}
	}, [data, setQuestions]);

	/*Проверяет текущий активный вопрос*/
	async function checkAnswer(answer: string) {
		const activeIndex = questions.findIndex((q) => q.status === 'active');
		//check from backend
		const { status, answer: correctAnswer } = await checkAnswerBackend({
			questionId: questions[activeIndex].id,
			answer,
		}).unwrap();

		questions[activeIndex].status = status;
		questions[activeIndex].answer = answer;
		questions[activeIndex].correctAnswer = correctAnswer;
		setQuestions([...questions], () => next(activeIndex));
	}

	/*Переходим к следующему вопросу c активного если если не указан fromIndex или следующий за fromIndex*/
	function next(fromIndex?: number) {
		//переходит на следующий вопрсос ожидающий ответа
		const activeIndex = fromIndex ?? questions.findIndex((q) => q.status === 'active');

		const lastIndex = questions.length - 1;
		let nextQuestionIndex: null | number = null;

		if (activeIndex !== lastIndex) {
			for (let index = activeIndex; index <= lastIndex; index++) {
				if (questions[index].status === 'wait') {
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
			if (fromIndex === undefined) {
				questions[activeIndex].status = 'wait';
			}
			questions[nextQuestionIndex].status = 'active';
			setQuestions([...questions]);
		}
	}

	/*Изменить вопрос на активный по рефу*/
	function setActive(id: number) {
		if (!questions) return;
		const index = questions.findIndex((q) => {
			return q.id === id;
		});
		if (index === -1) return;
		questions.forEach((q, i) => {
			if (q.status === 'active') {
				questions[i].status = 'wait';
			}
		});
		questions[index].status = 'active';

		setQuestions([...questions]);
	}

	return { questions, next, checkAnswer, setActive };
}
