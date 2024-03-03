import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import { forwardRef, useEffect } from 'react';
import { Box, Input, Sheet } from '@mui/joy';
import { QuestionType } from '../../hooks/practice';
import QuestionMenu from '../QuestionMenu/QuestionMenu';

export interface QuestionProps {
	question: QuestionType;
	setActive: (id: number) => void;
}

const PracticeQuestion = forwardRef<HTMLInputElement, QuestionProps>((props, ref) => {
	const { question: q, setActive } = props;

	/*При установки элемента как активного - наводить фокус на его инпут*/
	useEffect(() => {
		if (q.status === 'active') {
			if (!ref) return;
			if (typeof ref !== 'function') {
				const input = ref.current?.querySelector('input');
				if (input) {
					input.focus();
				}
			}
		}
	}, [ref, q.status]);

	function getColor(status: QuestionType['status']): 'primary' | 'danger' | 'success' | 'warning' | 'neutral' {
		switch (status) {
			case 'wait':
				return 'primary';
			case 'fail':
				return 'danger';
			case 'success':
				return 'success';
			case 'active':
				return 'warning';
			default:
				return 'neutral';
		}
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
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<Box sx={{ fontWeight: 'bold' }}>{q.question}</Box>
				{q.status === 'active' && <Input error={false} variant='soft' fullWidth spellCheck={false} ref={ref} />}
				{q.status === 'fail' && (
					<Box sx={{ display: 'flex', columnGap: '1rem', rowGap: '0.5rem', flexWrap: 'wrap' }}>
						<Sheet color='danger' sx={{ px: '0.5rem', borderRadius: '5px' }}>
							{q.answer}
						</Sheet>
						{Array.isArray(q.rightAnswers) &&
							q.rightAnswers.map((rightAnswer, index) => (
								<Sheet key={index} color='success' sx={{ px: '0.5rem', borderRadius: '5px' }}>
									{rightAnswer}
								</Sheet>
							))}
					</Box>
				)}
				{q.status === 'success' && <Box>{q.answer}</Box>}
				<Box sx={{ display: 'flex', fontSize: '0.7rem', gap: '0.7rem' }}>
					{Array.isArray(q.categories) ? q.categories.map((c) => <Box key={c.id}>{c.name}</Box>) : null}
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ width: '24px' }}>
					{q.status === 'active' && <CircularProgress size='20px' sx={{ color: 'text.primary' }} />}
					{q.status === 'success' && <DoneIcon />}
					{q.status === 'fail' && <ErrorIcon sx={{ color: 'warning.main' }} />}
					{/*{status === 'wait' && <ErrorIcon sx={{ color: 'warning.main' }} />}*/}
				</Box>
				<QuestionMenu questionId={q.id} />
			</Box>
		</Sheet>
	);
});

export default PracticeQuestion;
