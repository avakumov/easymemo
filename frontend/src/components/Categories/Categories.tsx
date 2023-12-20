import api from '../../services/ApiService';
import { map } from '../../utils';
import Loading from '../Loading/Loading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { EntityNames } from '../../types';
import { Alert, IconButton, Sheet, Table } from '@mui/joy';
import { showMessage } from '../../store/slices/messageSlice';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';

const Categories = () => {
	const { data: categories, error, isLoading } = api.useGetCategoriesQuery();
	const [removeEntity] = api.useRemoveEntityMutation();
	const dispatch = useDispatch();

	if (isLoading) return <Loading />;
	if (error && 'status' in error) return <Alert color='danger'>{JSON.stringify(error.status)} </Alert>;

	async function removeElement(id: number) {
		try {
			const removedCategory = await removeEntity({ entityName: EntityNames.CATEGORY, id }).unwrap();
			if (removedCategory.id) {
				dispatch(showMessage({ message: 'Category removed', type: 'success' }));
				dispatch(api.util.invalidateTags([EntityNames.CATEGORY]));
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
						<th>name</th>
						<th>questions</th>
						<th>description</th>
						<th>published</th>
						<th>createdAt</th>
						<th align='center'>edit</th>
					</tr>
				</thead>
				<tbody>
					{map(categories, (row) => (
						<tr key={row.id}>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{row._count.questions}</td>
							<td>{row.description ?? '-'}</td>
							<td>{row.published ? 'true' : 'false'}</td>
							<td>{row.createdAt}</td>
							<td align='center'>
								<IconButton
									onClick={() =>
										dispatch(entityModalOpen({ name: EntityNames.CATEGORY, data: row, open: true }))
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

export default Categories;
