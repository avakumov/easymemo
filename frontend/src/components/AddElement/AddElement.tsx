import { IconButton } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { useSearchParams } from 'react-router-dom';
import { EntityNames } from '../../types';
import { SxProps } from '@mui/joy/styles/types';

export default function AddElement({ sx }: { sx: SxProps }) {
	const [params] = useSearchParams();
	const nameElement = params.get('show');
	const dispatch = useDispatch();

	function addClick() {
		if (!nameElement) return;
		if (nameElement === EntityNames.QUESTION || nameElement === EntityNames.CATEGORY) {
			dispatch(entityModalOpen({ name: nameElement, open: true }));
		}
	}

	return (
		<IconButton variant='soft' color='primary' onClick={addClick} sx={sx}>
			<AddCircleOutlineIcon />
		</IconButton>
	);
}
