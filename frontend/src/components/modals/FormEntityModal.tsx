import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { EntityName, EntityNames, IQuestion } from '../../types';
import { Box } from '@mui/material';
import FormQuestion from '../forms/FormQuestion';
import { entityModalClose } from '../../store/reducers/FormEntityModalReducer';

const FormEntityModal = () => {
	const { open, name, data } = useSelector((state: RootState) => state.formEntityModalReducer);
	const dispatch = useDispatch();
	return (
		<BasicModal
			isOpen={open}
			close={() => {
				dispatch(entityModalClose());
			}}>
			<FormEntity name={name} data={data} />
		</BasicModal>
	);
};

function FormEntity({ name, data }: { name: EntityName; data: IQuestion | undefined }) {
	switch (name) {
		case EntityNames.QUESTION:
			return <FormQuestion data={data} />;
		default:
			return <Box>Uncknown entity create</Box>;
	}
}

export default FormEntityModal;
