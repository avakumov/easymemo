import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { EntityName, EntityNames } from '../../types';
import ScrollButton from '../ScrollButton/ScrollButton';
import { Box, IconButton, Sheet } from '@mui/joy';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';

interface TableInfoProps {
	name: EntityName | string;
	handlePlus: () => void;
}

const TableInfo: React.FC<TableInfoProps> = ({ name }) => {
	const dispatch = useDispatch();
	if (name !== EntityNames.QUESTION && name !== EntityNames.CATEGORY && name !== EntityNames.USER) {
		return null;
	}
	return (
		<Sheet
			variant='outlined'
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				p: 1,
			}}>
			<Box sx={{ textTransform: 'uppercase' }}>{name}</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					p: 1,
				}}>
				<IconButton onClick={() => dispatch(entityModalOpen({ name, open: true }))}>
					<AddCircleOutlineIcon />
				</IconButton>
				<ScrollButton />
			</Box>
		</Sheet>
	);
};
export default TableInfo;
