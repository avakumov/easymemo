import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef } from 'react';
import { Box, Input, Sheet } from '@mui/joy';
import { QuestionType } from '../../hooks/practice';
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import CancelIcon from '@mui/icons-material/Cancel';

export interface QuestionProps {
	question: QuestionType;
	setActive: (id: number) => void;
	changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PracticeQuestion = (props: QuestionProps) => {
	const { question: q, setActive, changeInputHandler } = props;
	const ref = useRef<HTMLInputElement>(null);
	/*При установки элемента как активного - наводить фокус на его инпут*/
	useEffect(() => {
		if (q.status === 'active') {
			ref?.current?.focus();
		}
	}, [ref, q.status]);

	function getColor(status: QuestionType['status']): 'danger' | 'success' | 'primary' {
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

	function getColorInput(q: QuestionType) {
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
					setActive(q.id);
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
						color={getColorInput(q)}
						value={q.currentAnswer}
						onChange={changeInputHandler}
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

export default PracticeQuestion;
