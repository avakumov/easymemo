import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EntityName } from '../../types';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useState, useEffect } from 'react';
import AdminDrawer from '../menu/AdminDrawer';

interface TableInfoProps {
	name: EntityName;
	handlePlus: () => void;
}

const TableInfo: React.FC<TableInfoProps> = ({ name }) => {
	const dispatch = useDispatch();
	const [isBottom, setIsBottom] = useState(false);

	function handleScroll() {
		setIsBottom(window.pageYOffset + window.innerHeight >= document.body.scrollHeight);
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				p: 1,
			}}>
			<AdminDrawer />
			<Box sx={{ textTransform: 'uppercase' }}>{name}</Box>
			<Box>
				<IconButton
					sx={{ color: 'text.primary' }}
					size='small'
					onClick={() => dispatch(entityModalOpen({ name, open: true }))}>
					<AddCircleOutlineIcon />
				</IconButton>
				{isBottom ? (
					<IconButton
						sx={{ color: 'text.primary' }}
						size='small'
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
						<KeyboardDoubleArrowUpIcon />
					</IconButton>
				) : (
					<IconButton
						sx={{ color: 'text.primary' }}
						size='small'
						onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
						<KeyboardDoubleArrowDownIcon />
					</IconButton>
				)}
			</Box>
		</Box>
	);
};
export default TableInfo;
