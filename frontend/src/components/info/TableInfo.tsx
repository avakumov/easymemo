import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EntityName } from '../../types';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';

interface TableInfoProps {
	name: EntityName;
	handlePlus: () => void;
}

const TableInfo: React.FC<TableInfoProps> = ({ name }) => {
	const dispatch = useDispatch();
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				p: 1,
			}}>
			<Box sx={{ textTransform: 'uppercase' }}>{name}</Box>
			<IconButton
				sx={{ color: 'text.primary' }}
				size='small'
				onClick={() => dispatch(entityModalOpen({ name, open: true }))}>
				<AddCircleOutlineIcon />
			</IconButton>
		</Box>
	);
};
export default TableInfo;
