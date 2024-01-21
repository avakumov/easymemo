import QuestionsFilterModal from '../modals/QuestionsFilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { openQuestionsFilterModal } from '../../store/slices/filtersSlice';
import { RootState } from '../../store/store';
import FilterButton from './FilterButton';

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
