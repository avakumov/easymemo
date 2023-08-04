import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { editModalClose } from '../../store/reducers/EditModalReducer';

const EditModal = () => {
	const { data, open, name } = useSelector((state: RootState) => state.editModalReducer);
	const dispatch = useDispatch();
	return (
		<BasicModal
			isOpen={open}
			close={() => {
				dispatch(editModalClose());
			}}>
			{'Name of object: ' + name + '\n'}
			{JSON.stringify(data)}
		</BasicModal>
	);
};

export default EditModal;
