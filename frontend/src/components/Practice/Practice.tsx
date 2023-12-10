import { Box } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePratice } from '../../hooks/practice';
import { groupParamsByKey } from '../../utils';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';

export default function Practice() {
	const [searchParams] = useSearchParams();
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

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }} onKeyDown={onKeyDown} onFocus={setActive}>
			{questions.map((q) => (
				<PracticeQuestion key={q.id} {...q} />
			))}
		</Box>
	);
}
