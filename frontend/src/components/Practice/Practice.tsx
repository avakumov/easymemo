import { Box } from '@mui/joy';
import { useEffect } from 'react';
import PracticeQuestion from '../PracticeQuestion/PracticeQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BarActions from '../BarActions/BarActions';
import { setPracticeAllCount, setPracticeQuestions, setPracticeSuccessCount } from '../../store/slices/practiceSlice';
import api from '../../services/ApiService';

export default function Practice() {
	const dispatch = useDispatch();
	let { categories, count, enabled } = useSelector((state: RootState) => state.practice.filter);

	if (!enabled) {
		categories = null;
	}

	const { data } = api.useGetPracticeQuery({ categories, count });
	useEffect(() => {
		if (!data) return;
		dispatch(setPracticeQuestions(data));
	}, [data, dispatch]);

	const questions = useSelector((state: RootState) => state.practice.questions);

	useEffect(() => {
		const successCount = questions.reduce((acc, curr) => {
			curr.status === 'success' && acc++;
			return acc;
		}, 0);
		dispatch(setPracticeSuccessCount(successCount));
		const allCount = questions.length;
		dispatch(setPracticeAllCount(allCount));
	}, [dispatch, questions]);

	return (
		<Box
			sx={{
				maxWidth: '900px',
				minWidth: {
					md: 'calc(850px - var(--Sidebar-width))',
				},
			}}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				{questions.map((q) => (
					<PracticeQuestion key={q.id} question={q} />
				))}
			</Box>
		</Box>
	);
}
