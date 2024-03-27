import { IconButton } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { EntityNames } from '../../types';
import { SxProps } from '@mui/joy/styles/types';

export default function AddElementButton({ sx, nameElement }: { sx: SxProps; nameElement: string }) {
	const dispatch = useDispatch();

	function addClick() {
		if (!nameElement) return;
		if (nameElement === EntityNames.QUESTION || nameElement === EntityNames.CATEGORY) {
			return dispatch(entityModalOpen({ name: nameElement, open: true }));
		}
		if (nameElement === EntityNames.BOOKS) {
			return dispatch(entityModalOpen({ name: EntityNames.BOOKS, open: true }));
		}
	}

	return (
		<IconButton variant='soft' color='primary' onClick={addClick} sx={sx}>
			<AddCircleOutlineIcon />
		</IconButton>
	);
}
