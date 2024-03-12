import { Box } from '@mui/joy';
import React, { useEffect } from 'react';
import { usePratice } from '../../hooks/practice';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BarActions from '../BarActions/BarActions';
import { setPracticeAllCount, setPracticeSuccessCount } from '../../store/slices/practiceSlice';

const PracticeQuestionMemo = React.memo(PracticeQuestion);

export default function Practice() {
	const filter = useSelector((state: RootState) => state.practice.filter);
	const dispatch = useDispatch();

	const { questions, next, checkAnswer, setActive, changeInputHandler } = usePratice(filter);

	useEffect(() => {
		const successCount = questions.reduce((acc, curr) => {
			curr.status === 'success' && acc++;
			return acc;
		}, 0);
		dispatch(setPracticeSuccessCount(successCount));
		const allCount = questions.length;
		dispatch(setPracticeAllCount(allCount));
	}, [dispatch, questions]);

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		if (e.key === 'Tab') {
			e.preventDefault();
			next();
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			checkAnswer(target.value);
		}
	};

	return (
		<Box
			sx={{
				maxWidth: '900px',
				m: 1,

				minWidth: {
					md: 'calc(850px - var(--Sidebar-width))',
				},
			}}>
			<BarActions
				page={'practice'}
				sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'end', p: 1, alignItems: 'center' }}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onKeyDown={onKeyDown}>
				{questions.map((q) => (
					<PracticeQuestionMemo
						key={q.id}
						question={q}
						setActive={setActive}
						changeInputHandler={changeInputHandler}
					/>
				))}
			</Box>
		</Box>
	);
}
