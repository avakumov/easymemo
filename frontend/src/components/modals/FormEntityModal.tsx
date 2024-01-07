import BasicModal from './BasicModal';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { EntityName, EntityNames, ICategory, IQuestion, IUser } from '../../types';
import { Box } from '@mui/material';
import FormQuestion from '../forms/FormQuestion';
import FormCategory from '../forms/FormCategory';
import { entityModalClose } from '../../store/slices/FormEntityModalSlice';

const FormEntityModal = () => {
	const { open, name, data } = useSelector((state: RootState) => state.formEntityModal);
	const dispatch = useDispatch();
	function closeModal() {
		//close modal
		dispatch(entityModalClose());
	}
	return (
		<BasicModal isOpen={open} close={closeModal}>
			<Box
				sx={{
					width: {
						xs: '300px',
						sm: '300px',
						md: '400px',
					},
				}}>
				<FormEntity name={name} data={data} exit={closeModal} />
			</Box>
		</BasicModal>
	);
};

function FormEntity({
	name,
	data,
	exit,
}: {
	name: EntityName;
	data: IQuestion | ICategory | IUser | undefined;
	exit: () => void;
}) {
	switch (name) {
		case EntityNames.QUESTION:
			return <FormQuestion data={data as IQuestion} exit={exit} />;
		case EntityNames.CATEGORY:
			return <FormCategory data={data as ICategory} exit={exit} />;
		default:
			return <Box>Uncknown entity create</Box>;
	}
}

export default FormEntityModal;
