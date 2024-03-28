import Search from '../Search/Search';
import { SxProps } from '@mui/joy/styles/types';
import { Box, Sheet, Typography, useTheme } from '@mui/joy';
import { QuestionsFilterButton } from '../buttons/QuestionsFilterButton';
import AddElementButton from '../buttons/AddElementButton';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/ApiService';
import ReplayButton from '../buttons/ReplayButton';
import FilterButton from '../buttons/FilterButton';
import { openPracticeFilterModal } from '../../store/slices/practiceSlice';
import { RootState } from '../../store/store';
import { EntityNames } from '../../types';

const mapActions = new Map([
	['questions', <ActionsQuestions />],
	['categories', <ActionsCategories />],
	['practice', <ActionsPractice />],
	['slides', <ActionsSlides />],
	['books', <ActionsBooks />],
]);

export default function BarActions({ sx, page }: { sx?: SxProps; page: string | undefined | null }) {
	if (!page) return null;
	const component = mapActions.get(page);
	if (!component) return null;
	return (
		<Box sx={sx}>
			<Box
				sx={{
					display: 'flex',
					alingItems: 'center',
					gap: 1,
				}}>
				{component}
			</Box>
		</Box>
	);
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
			<AddElementButton sx={{ ml: 'auto' }} nameElement={EntityNames.QUESTION} />
		</>
	);
}
function ActionsSlides() {
	return (
		<>
			<QuestionsFilterButton />
			<AddElementButton sx={{ ml: 'auto' }} nameElement={EntityNames.QUESTION} />
		</>
	);
}

function ActionsCategories() {
	return (
		<>
			<AddElementButton sx={{ ml: 'auto' }} nameElement={EntityNames.CATEGORY} />
		</>
	);
}

function ActionsBooks() {
	return (
		<>
			<AddElementButton sx={{ ml: 'auto' }} nameElement={EntityNames.BOOKS} />
		</>
	);
}
