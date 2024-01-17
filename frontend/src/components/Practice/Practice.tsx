import { Box, IconButton, Typography } from '@mui/joy';
import React from 'react';
import { usePratice } from '../../hooks/practice';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';

import ReplayIcon from '@mui/icons-material/Replay';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch, useSelector } from 'react-redux';
import { openPracticeFilterModal } from '../../store/slices/practiceSlice';
import { RootState } from '../../store/store';
import api from '../../services/ApiService';
const PracticeQuestionMemo = React.memo(PracticeQuestion);

export default function Practice() {
	const dispatch = useDispatch();
	const filter = useSelector((state: RootState) => state.practice.filter);

	const { questions, next, checkAnswer, setActive } = usePratice(filter);

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

	function replay() {
		dispatch(api.util.invalidateTags(['practice']));
	}

	function openFilters() {
		dispatch(openPracticeFilterModal());
	}

	return (
		<Box sx={{ maxWidth: '900px' }}>
			<Box sx={{ display: 'flex', columnGap: '0.5rem', mb: '1rem', alignItems: 'center' }}>
				<IconButton variant='soft' color='primary' onClick={openFilters} title='Open filters'>
					<FilterAltIcon />
				</IconButton>
				<IconButton variant='outlined' color='primary' onClick={replay} title='Update questions'>
					<ReplayIcon />
				</IconButton>
				<Typography level='title-md' sx={{ ml: 'auto' }}>
					{questions.reduce((acc, curr) => {
						curr.status === 'success' && acc++;
						return acc;
					}, 0)}
					/{questions.length}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onKeyDown={onKeyDown}>
				{questions.map((q) => (
					<PracticeQuestionMemo key={q.id} question={q} ref={q.ref} setActive={setActive} />
				))}
			</Box>
		</Box>
	);
}
