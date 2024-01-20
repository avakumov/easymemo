import { IconButton } from '@mui/joy';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import QuestionsFilterModal from '../modals/QuestionsFilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { openQuestionsFilterModal } from '../../store/slices/filtersSlice';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { RootState } from '../../store/store';

export function QuestionsFilter() {
	const dispatch = useDispatch();
	const { categories } = useSelector((state: RootState) => state.filters.questions.filter);
	return (
		<>
			<FilterButton
				disabled={categories.length === 0}
				onClick={() => {
					dispatch(openQuestionsFilterModal());
				}}
			/>

			<QuestionsFilterModal />
		</>
	);
}

function FilterButton({ disabled = false, ...props }: { disabled: boolean; [x: string]: any }) {
	return (
		<IconButton {...props} variant='soft' color='primary' title='Open filters'>
			{disabled ? <FilterAltOffIcon /> : <FilterAltIcon />}
		</IconButton>
	);
}
