import { Box, IconButton, Typography } from '@mui/joy';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePratice } from '../../hooks/practice';
import { groupParamsByKey } from '../../utils';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';

import ReplayIcon from '@mui/icons-material/Replay';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch } from 'react-redux';
import { openPracticeFilterModal } from '../../store/slices/practiceSlice';
const PracticeQuestionMemo = React.memo(PracticeQuestion);

export default function Practice() {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const params = groupParamsByKey(searchParams);

	const { questions, next, checkAnswer, setActive } = usePratice({ params });

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			next();
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			const target = e.target as HTMLInputElement;
			checkAnswer(target.value);
		}
	};

	function replay() {}

	function openFilters() {
		dispatch(openPracticeFilterModal());
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', columnGap: '0.5rem', mb: '1rem', alignItems: 'center' }}>
				<IconButton variant='soft' color='primary' onClick={openFilters} title='Open filters'>
					<FilterAltIcon />
				</IconButton>
				<IconButton variant='soft' color='primary' onClick={replay} title='Update questions'>
					<ReplayIcon />
				</IconButton>
				<Typography level='title-md' sx={{ ml: 'auto' }}>
					5/10
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				onKeyDown={onKeyDown}
				onFocus={(e) => {
					setActive(e);
				}}>
				{questions.map((q) => (
					<PracticeQuestionMemo key={q.id} question={q} ref={q.ref} setActive={setActive} />
				))}
			</Box>
		</Box>
	);
}
