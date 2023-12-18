import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { closePracticeFilterModal } from '../../store/slices/practiceSlice';
import PracticeFilter from '../filters/PracticeFilter';

const PracticeFilterModal = () => {
	const { openFilterModal: open, filter } = useSelector((state: RootState) => state.practice);
	const dispatch = useDispatch();
	function closeModal() {
		//close modal
		dispatch(closePracticeFilterModal());
	}
	return (
		<BasicModal isOpen={open} close={closeModal}>
			<PracticeFilter />
		</BasicModal>
	);
};

export default PracticeFilterModal;
