import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import React, { forwardRef, useEffect } from 'react';
import { Box, Input, Sheet } from '@mui/joy';

export interface QuestionProps {
	question: string;
	categories: { id: number; name: string }[];
	status: 'wait' | 'active' | 'success' | 'fail';
	answer?: string;
}

const PracticeQuestion = forwardRef<HTMLInputElement, QuestionProps>((props, ref) => {
	const { question, categories, status, answer } = props;

	useEffect(() => {
		if (status === 'active') {
			if (!ref) return;
			if (typeof ref !== 'function') {
				ref.current?.focus();
			}
		}
	}, [ref, status]);

	function styleStatus(status: QuestionProps['status']) {
		switch (status) {
			case 'success': {
				return {
					backgroundColor: 'green',
					filter: 'grayscale(70%)',
				};
			}
			case 'fail': {
				return {
					filter: 'grayscale(70%)',
					backgroundColor: 'orange',
				};
			}
			case 'active': {
				return {
					// borderColor: 'info.main',
				};
			}
			default: {
				return { backgroundColor: 'inherit' };
			}
		}
	}

	// const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === 'Enter') {
	// 		const target = e.target as HTMLInputElement;
	// console.log('checke pass: ', target.value);
	// check(target.value);
	// }
	// };

	// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	// 	console.log('input value: ', e.target.value);
	// };

	return (
		<Sheet
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				p: 1,
				pl: 2,
				...styleStatus(status),
			}}>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<Box sx={{ fontWeight: 'bold' }}>{question}</Box>
				<Input
					error={false}
					variant='soft'
					fullWidth
					spellCheck={false}
					ref={ref}
					// onKeyDown={keyDownHandler}
					// onChange={onChangeHandler}
					disabled={status === 'success' || status === 'fail'}
					{...(status === 'fail' ? { value: answer } : {})}
				/>
				<Box sx={{ display: 'flex', fontSize: '0.7rem' }}>
					{Array.isArray(categories) ? categories.map((c) => <Box key={c.id}>{c.name}</Box>) : null}
				</Box>
			</Box>
			<Box sx={{ width: '24px' }}>
				{status === 'active' && <CircularProgress size='20px' sx={{ color: 'text.primary' }} />}
				{status === 'success' && <DoneIcon />}
				{status === 'fail' && <ErrorIcon sx={{ color: 'warning.main' }} />}
				{/*{status === 'wait' && <ErrorIcon sx={{ color: 'warning.main' }} />}*/}
			</Box>
		</Sheet>
	);
});

export default PracticeQuestion;
