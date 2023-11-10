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
import { useDispatch } from 'react-redux';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EntityNames } from '../../types';

const Users = () => {
	const { data: users, error, isLoading } = api.useGetUsersQuery();
	const dispatch = useDispatch();

	const [removeEntity] = api.useRemoveEntityMutation();

	if (isLoading) return <Loading />;
	if (error && 'status' in error) return <BasicAlert type='error' message={JSON.stringify(error.status)} />;

	function removeElement(id: number) {
		removeEntity({ entityName: EntityNames.USER, id });
		dispatch(api.util.invalidateTags([EntityNames.USER]));
	}

	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell align='right'>name</TableCell>
						<TableCell>email</TableCell>
						<TableCell>password</TableCell>
						<TableCell align='center'>edit</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{map(users, (row) => (
						<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell align='right'>{row.name}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell>{row.password}</TableCell>
							<TableCell align='center'>
								<IconButton
									sx={{ color: 'text.primary' }}
									size='small'
									onClick={() =>
										dispatch(entityModalOpen({ name: EntityNames.USER, data: row, open: true }))
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

export default Users;
