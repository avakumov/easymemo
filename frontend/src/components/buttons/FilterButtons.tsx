import { IconButton } from '@mui/joy';
import QuestionsFilterModal from '../modals/QuestionsFilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { openQuestionsFilterModal } from '../../store/slices/filtersSlice';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { RootState } from '../../store/store';

export function QuestionsFilterButton() {
	const dispatch = useDispatch();
	const filterEnabled = useSelector((state: RootState) => state.filters.questions.enabled);
	return (
		<>
			<FilterButton
				disabled={!filterEnabled}
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
