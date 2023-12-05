import { Box, Paper, TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

export interface QuestionProps {
	question: string;
	answer: string;
	categories: { id: number; name: string }[];
	status: 'wait' | 'active' | 'success' | 'fail';
}

const PracticeQuestion = forwardRef<HTMLInputElement, QuestionProps>((props, ref) => {
	// const inputRef = useForwardRef<HTMLInputElement>(ref);
	const { question, answer, categories, status } = props;
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
					filter: 'grayscale(80%)',
				};
			}
			case 'fail': {
				return {
					filter: 'grayscale(80%)',
					backgroundColor: 'error.main',
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
	return (
		<Paper
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				p: 1,
				pl: 2,
				...styleStatus(status),
			}}>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<Box>{question}</Box>
				<TextField
					error={false}
					fullWidth
					autoFocus
					helperText={''}
					size='small'
					inputRef={ref}
					disabled={status === 'success' || status === 'fail'}
				/>
				<Box sx={{ display: 'flex', fontSize: '0.7rem' }}>
					{categories.map((c) => (
						<Box key={c.id}>{c.name}</Box>
					))}
				</Box>
			</Box>
			<Box sx={{ width: '24px' }}>
				{status === 'active' && <CircularProgress size='20px' sx={{ color: 'text.primary' }} />}
				{status === 'success' && <DoneIcon />}
				{status === 'fail' && <ErrorIcon sx={{ color: 'warning.main' }} />}
				{/*{status === 'wait' && <ErrorIcon sx={{ color: 'warning.main' }} />}*/}
			</Box>
		</Paper>
	);
});

export default PracticeQuestion;
