import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import { memo, useEffect, useRef } from 'react';
import { Box, Input, Sheet } from '@mui/joy';
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import CancelIcon from '@mui/icons-material/Cancel';
import {
	changePracticeInput,
	changePracticeQuestion,
	nextPracticeQuestion,
	setPracticeActive,
	setPracticeCurrentCorrect,
} from '../../store/slices/practiceSlice';
import { useDispatch } from 'react-redux';
import api from '../../services/ApiService';
import { QuestionPracticeType } from '../../types';

export interface QuestionProps {
	question: QuestionPracticeType;
}

const PracticeQuestion = (props: QuestionProps) => {
	const { question: q } = props;
	const dispatch = useDispatch();

	const [checkAnswerBackend] = api.useCheckAnwerMutation();
	const [checkCurrentAnswerBackend] = api.useCheckCurrentAnwerMutation();

	const ref = useRef<HTMLInputElement>(null);
	/*При установки элемента как активного - наводить фокус на его инпут*/
	useEffect(() => {
		if (q.status === 'active') {
			ref?.current?.focus();
		}
	}, [ref, q.status]);

	/*Проверяет текущий активный вопрос*/
	async function checkAnswer(answer: string) {
		//check from backend
		const { status, rightAnswers } = await checkAnswerBackend({
			questionId: q.id,
			answer,
		}).unwrap();
		const question = { id: q.id, status, answer, rightAnswers };
		dispatch(changePracticeQuestion(question));
		dispatch(nextPracticeQuestion({}));
	}

	async function checkCurrentAnswer(answer: string) {
		const { isRight } = await checkCurrentAnswerBackend({
			questionId: q.id,
			answer,
		}).unwrap();
		dispatch(setPracticeCurrentCorrect({ id: q.id, isCorrect: isRight }));
	}

	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(changePracticeInput({ id: q.id, value: e.target.value }));
		checkCurrentAnswer(e.target.value);
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		if (e.key === 'Tab') {
			e.preventDefault();
			dispatch(nextPracticeQuestion({}));
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			checkAnswer(target.value);
		}
	};

	function getColor(status: QuestionPracticeType['status']): 'danger' | 'success' | 'primary' {
		switch (status) {
			case 'fail':
				return 'danger';
			case 'success':
				return 'success';
			default:
				return 'primary';
		}
	}

	function isShowInput() {
		if (q.status === 'active') {
			return true;
		}
		if (q.status === 'wait' && q.currentAnswer !== '') {
			return true;
		}
		return false;
	}

	function getColorInput(q: QuestionPracticeType) {
		const value = ref.current?.value;
		if (q.isCurrentCorrect) {
			return 'success';
		}
		if (value === '') {
			return 'neutral';
		}
		return 'danger';
	}

	return (
		<Sheet
			variant='soft'
			color={getColor(q.status)}
			onClick={() => {
				if (q.status === 'wait') {
					dispatch(setPracticeActive(q.id));
				}
			}}
			sx={{
				display: 'flex',
				pl: 2,
				pr: 1,
				py: 1,
				borderRadius: '10px',
				justifyContent: 'space-between',
				width: '100%',
				minWidth: '330px',
			}}>
			<Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '100%' }}>
				<Box sx={{ fontWeight: 'bold' }}>{q.question}</Box>
				{isShowInput() && (
					<Input
						error={false}
						variant='plain'
						fullWidth
						spellCheck={false}
						slotProps={{ input: { ref: ref } }}
						onKeyDown={onKeyDown}
						color={getColorInput(q)}
						value={q.currentAnswer}
						onChange={changeInput}
						sx={{
							fontWeight: 'bold',
						}}
					/>
				)}

				{q.status === 'fail' && (
					<Box sx={{ display: 'flex', columnGap: '1rem', rowGap: '0.5rem', flexWrap: 'wrap' }}>
						<Sheet color='danger' sx={{ px: '0.5rem', borderRadius: '5px', fontWeight: 'bold' }}>
							{q.answer}
						</Sheet>
						{Array.isArray(q.rightAnswers) &&
							q.rightAnswers.map((rightAnswer, index) => (
								<Sheet
									key={index}
									color='success'
									sx={{ px: '0.5rem', borderRadius: '5px', fontWeight: 'bold' }}>
									{rightAnswer}
								</Sheet>
							))}
					</Box>
				)}
				{q.status === 'success' && <Box sx={{ fontWeight: 'bold' }}>{q.answer}</Box>}
				<Box sx={{ display: 'flex', fontSize: '0.7rem', gap: '0.7rem', px: 1, py: 0.2, fontStyle: 'italic' }}>
					{Array.isArray(q.categories) ? q.categories.map((c) => <Box key={c.id}>{c.name}</Box>) : null}
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ width: '24px' }}>
					{q.status === 'active' && <CircularProgress size='20px' sx={{ color: 'text.primary' }} />}
					{q.status === 'success' && <DoneIcon />}
					{q.status === 'fail' && <CancelIcon sx={{ color: 'warning.main' }} />}
					{/*{status === 'wait' && <ErrorIcon sx={{ color: 'warning.main' }} />}*/}
				</Box>
				<QuestionMenu questionId={q.id} />
			</Box>
		</Sheet>
	);
};

export default memo(PracticeQuestion);
