import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchQuestions } from '../../store/reducers/ActionCreators';

const Questions = () => {
	const dispatch = useAppDispatch();
	const { questions, error, loading } = useAppSelector((state) => state.questionsReducer);

	useEffect(() => {
		dispatch(fetchQuestions());
	}, []);
	return (
		<Box>
			list of quesitons:
			{JSON.stringify(questions, null, 2)}
			error:
			{error}
		</Box>
	);
};

export default Questions;
