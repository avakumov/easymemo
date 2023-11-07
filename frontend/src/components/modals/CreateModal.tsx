import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { EntityName, EntityNames } from '../../types';
import { Box } from '@mui/material';
import CreateQuestionForm from '../forms/CreateQuestion';
import { createEntityModalClose } from '../../store/reducers/CreateModalReducer';

const CreateModal = () => {
	const { open, name } = useSelector((state: RootState) => state.createModalReducer);
	const dispatch = useDispatch();
	return (
		<BasicModal
			isOpen={open}
			close={() => {
				dispatch(createEntityModalClose());
			}}>
			<CreateEntity name={name} />
		</BasicModal>
	);
};

function CreateEntity({ name }: { name: EntityName }) {
	switch (name) {
		case EntityNames.QUESTION:
			return <CreateQuestionForm />;
		default:
			return <Box>Uncknown entity create</Box>;
	}
}

export default CreateModal;
