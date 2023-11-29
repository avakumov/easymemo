import { IconButton } from '@mui/material';
import api from '../../services/ApiService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { map } from '../../utils';
import Loading from '../Loading/Loading';
import BasicAlert from '../BasicAlert.tsx/BasicAlert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';
import { EntityNames } from '../../types';

const Categories = () => {
	const { data: categories, error, isLoading } = api.useGetCategoriesQuery();
	const [removeEntity] = api.useRemoveEntityMutation();
	const dispatch = useDispatch();

	if (isLoading) return <Loading />;
	if (error && 'status' in error) return <BasicAlert type='error' message={JSON.stringify(error.status)} />;

	function removeElement(id: number) {
		removeEntity({ entityName: EntityNames.CATEGORY, id });
		dispatch(api.util.invalidateTags([EntityNames.CATEGORY]));
	}

	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell align='right'>name</TableCell>
						<TableCell>description</TableCell>
						<TableCell>published</TableCell>
						<TableCell>createdAt</TableCell>
						<TableCell align='center'>edit</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{map(categories, (row) => (
						<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell align='right'>{row.name}</TableCell>
							<TableCell>{row.description ?? '-'}</TableCell>
							<TableCell>{row.published ? 'true' : 'false'}</TableCell>
							<TableCell>{row.createdAt}</TableCell>
							<TableCell align='center'>
								<IconButton
									sx={{ color: 'text.primary' }}
									size='small'
									onClick={() =>
										dispatch(entityModalOpen({ name: EntityNames.CATEGORY, data: row, open: true }))
									}>
									<EditIcon fontSize='inherit' />
								</IconButton>
								<IconButton
									sx={{ color: 'text.primary' }}
									size='small'
									onClick={() => removeElement(row.id)}>
									<DeleteOutlineIcon fontSize='inherit' />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Categories;
