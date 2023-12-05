import { Paper } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';

export default function Practice() {
	const [searchParams] = useSearchParams();
	const [questions, setQuestions] = useState<
		{
			id: number;
			question: string;
			answer: string;
			status: 'active' | 'wait' | 'fail' | 'success';
			categories: { id: number; name: string }[];
			ref: React.RefObject<HTMLInputElement>;
		}[]
	>([
		{
			id: 0,
			question: 'Какая сегодня погода',
			answer: 'хорошая',
			status: 'active',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
		{
			id: 1,
			question: 'Какая сегодня погода',
			answer: 'хорошая',
			status: 'wait',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
		{
			id: 2,
			question: 'Какая завтра погода',
			answer: 'отличная',
			status: 'fail',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
		{
			id: 3,
			question: 'Какая вчера погода',
			answer: 'нормальная',
			status: 'success',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
		{
			id: 4,
			question: 'Какая погода',
			answer: 'нормальная',
			status: 'wait',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
		{
			id: 5,
			question: 'Какая погода',
			answer: 'нормальная',
			status: 'wait',
			categories: [{ id: 1, name: 'погода' }],
			ref: React.createRef(),
		},
	]);
	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			//переходит на следующий вопрсос ожидающий ответа
			const currentQuestionIndex = questions.findIndex((q) => q.status === 'active');
			const lastIndex = questions.length - 1;
			let nextQuestionIndex: null | number = null;

			if (currentQuestionIndex !== lastIndex) {
				for (let index = currentQuestionIndex; index <= lastIndex; index++) {
					if (questions[index].status === 'wait') {
						nextQuestionIndex = index;
						break;
					}
				}
			}
			if (!nextQuestionIndex) {
				for (let index = 0; index < currentQuestionIndex; index++) {
					if (questions[index].status === 'wait') {
						nextQuestionIndex = index;
						break;
					}
				}
			}
			if (nextQuestionIndex !== null && Number.isInteger(nextQuestionIndex)) {
				//обновляем текущее положение активного инпута
				questions[currentQuestionIndex].status = 'wait';
				questions[nextQuestionIndex].status = 'active';
				setQuestions([...questions]);
			}
		}
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};
	return (
		<Paper
			sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}
			onKeyDown={onKeyDown}
			onFocus={(ref) => {
				if (!questions) return;
				const index = questions.findIndex((q) => {
					return q.ref.current === ref.target;
				});
				if (index === -1) return;
				questions.forEach((q, i) => {
					if (q.status === 'active') {
						questions[i].status = 'wait';
					}
				});
				questions[index].status = 'active';

				setQuestions([...questions]);
			}}>
			{questions.map((q) => (
				<PracticeQuestion key={q.id} {...q} />
			))}
		</Paper>
	);
}
