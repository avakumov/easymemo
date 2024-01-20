import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { closePracticeFilterModal } from '../../store/slices/practiceSlice';
import PracticeFilter from '../filters/PracticeFilter';
import { Box } from '@mui/joy';
import { closeQuestionsFilterModal } from '../../store/slices/filtersSlice';
import QuestionsFilter from '../filters/QuestionsFilter';

const QuestionsFilterModal = () => {
	const { isOpenModal } = useSelector((state: RootState) => state.filters.questions);
	const dispatch = useDispatch();
	function closeModal() {
		//close modal
		dispatch(closeQuestionsFilterModal());
	}
	return (
		<BasicModal isOpen={isOpenModal} close={closeModal}>
			<Box
				sx={{
					width: {
						xs: '300px',
						sm: '300px',
						md: '400px',
					},
				}}>
				<QuestionsFilter />
			</Box>
		</BasicModal>
	);
};

export default QuestionsFilterModal;
