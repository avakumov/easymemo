import Search from '../Search/Search';
import { SxProps } from '@mui/joy/styles/types';
import { Box, Sheet, Typography, useTheme } from '@mui/joy';
import { useSearchParams } from 'react-router-dom';
import { QuestionsFilterButton } from '../buttons/QuestionsFilterButton';
import AddElementButton from '../buttons/AddElementButton';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/ApiService';
import ReplayButton from '../buttons/ReplayButton';
import FilterButton from '../buttons/FilterButton';
import { openPracticeFilterModal } from '../../store/slices/practiceSlice';
import { RootState } from '../../store/store';

export default function BarActions({ sx }: { sx?: SxProps }) {
	const { pathname: path } = window.location;
	const [params] = useSearchParams();
	const showParam = params.get('show');

	return (
		<Box sx={sx}>
			<Box
				sx={{
					display: 'flex',
					alingItems: 'center',
					gap: 1,
				}}>
				<Actions path={path} showParam={showParam} />
			</Box>
		</Box>
	);
}

function Actions({ path, showParam }: { path: string; showParam: string | null }) {
	if (path === '/records') {
		if (showParam === 'questions') {
			return <ActionsQuestions />;
		} else if (showParam === 'categories') {
			return <ActionsCategories />;
		}
		return null;
	}
	if (path === '/') {
		return <ActionsPractice />;
	}
	if (path === '/slides') {
		return <ActionsQuestions />;
	}
	return null;
}

function ActionsPractice() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { successCount, allCount } = useSelector((state: RootState) => state.practice);
	const filterEnabled = useSelector((state: RootState) => state.practice.filter.enabled);
	return (
		<>
			<Sheet
				variant='outlined'
				color='primary'
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: theme.radius.sm,
					px: 1,
				}}>
				<Typography level='title-lg'>{`${successCount}/${allCount}`}</Typography>
			</Sheet>
			<ReplayButton onClick={() => dispatch(api.util.invalidateTags(['practice']))} />
			<FilterButton onClick={() => dispatch(openPracticeFilterModal())} disabled={!filterEnabled} />
		</>
	);
}

function ActionsQuestions() {
	return (
		<>
			<Search sx={{ display: 'flex', gap: 1 }} />
			<QuestionsFilterButton />
			<AddElementButton sx={{ ml: 'auto' }} />
		</>
	);
}

function ActionsCategories() {
	return (
		<>
			<AddElementButton sx={{ ml: 'auto' }} />
		</>
	);
}
