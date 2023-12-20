import api from '../../services/ApiService';
import { map } from '../../utils';
import Loading from '../Loading/Loading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EntityNames } from '../../types';
import { Alert, IconButton, Sheet, Table } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/messageSlice';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';

const Users = () => {
	const { data: users, error, isLoading } = api.useGetUsersQuery();
	const dispatch = useDispatch();

	const [removeEntity] = api.useRemoveEntityMutation();

	if (isLoading) return <Loading />;
	if (error && 'status' in error) return <Alert color='danger'>{JSON.stringify(error.status)}</Alert>;

	async function removeElement(id: number) {
		try {
			const removedUser = await removeEntity({ entityName: EntityNames.USER, id }).unwrap();
			if (removedUser.id) {
				dispatch(showMessage({ message: 'Category removed', type: 'success' }));
				dispatch(api.util.invalidateTags([EntityNames.USER]));
			} else {
				dispatch(showMessage({ type: 'info', message: 'Что-то пошло не так' }));
			}
		} catch (e: any) {
			console.log(e);
			dispatch(showMessage({ type: 'error', message: e?.data?.message ?? 'Error on remove' }));
		}
	}

	return (
		<Sheet variant='outlined'>
			<Table>
				<thead>
					<tr>
						<th>id</th>
						<th align='right'>name</th>
						<th>email</th>
						<th>password</th>
						<th align='center'>edit</th>
					</tr>
				</thead>
				<tbody>
					{map(users, (row) => (
						<tr key={row.id}>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{row.email}</td>
							<td>{row.password}</td>
							<td align='center'>
								<IconButton
									onClick={() =>
										dispatch(entityModalOpen({ name: EntityNames.USER, data: row, open: true }))
									}>
									<EditIcon fontSize='inherit' />
								</IconButton>
								<IconButton onClick={() => removeElement(row.id)}>
									<DeleteOutlineIcon fontSize='inherit' />
								</IconButton>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Sheet>
	);
};

export default Users;
