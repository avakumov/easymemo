import api from '../../services/ApiService';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EntityNames, IQuestion } from '../../types';
import { memo, useCallback, useState } from 'react';
import { Alert, Box, IconButton, Sheet, Table } from '@mui/joy';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { showMessage } from '../../store/slices/messageSlice';

const Questions = () => {
	const dispatch = useDispatch();
	// const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

	// const { data: categories } = api.useGetCategoriesQuery();
	// const [getQuestions, { data: questions, error, isLoading }] = api.useLazyGetQuestionsQuery();
	const { data: questions, error, isLoading } = api.useGetQuestionsQuery();
	const [removeEntity] = api.useRemoveEntityMutation();

	const editElement = useCallback(
		(data: IQuestion) => {
			dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: data, open: true }));
		},
		[dispatch]
	);

	async function removeElement(id: number) {
		try {
			const removedQuestion = await removeEntity({ entityName: EntityNames.QUESTION, id }).unwrap();

			if (removedQuestion.id) {
				removedQuestion.id && dispatch(showMessage({ message: 'Quesiton removed', type: 'success' }));
				dispatch(api.util.invalidateTags([EntityNames.QUESTION]));
			} else {
				dispatch(showMessage({ type: 'info', message: 'Что-то пошло не так' }));
			}
		} catch (e: any) {
			console.log(e);
			dispatch(showMessage({ type: 'error', message: e?.data?.message ?? 'Error on remove' }));
		}
	}
	const removeElementCallback = useCallback(removeElement, [dispatch, removeEntity]);

	if (isLoading) return <Loading />;

	if (error && 'status' in error) return <Alert color='danger'>{JSON.stringify(error.status)}</Alert>;

	return (
		<Sheet variant='outlined'>
			<Table stickyHeader>
				<thead>
					<tr>
						<th>id</th>
						<th> Categories</th>
						<th>Question</th>
						<th>Answer</th>
						<th>edit</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(questions)
						? questions.map((q) => (
								<TableRowMemo
									key={q.id}
									row={q}
									removeElement={removeElementCallback}
									editElement={editElement}
								/>
						  ))
						: null}
				</tbody>
			</Table>
		</Sheet>
	);
};

export default Questions;

const TableRowMemo = memo(
	({
		row,
		removeElement,
		editElement,
	}: // selected,
	// setSelected,
	{
		row: IQuestion;
		removeElement: (id: number) => void;
		editElement: (data: IQuestion) => void;
		// selected: boolean;
		// setSelected: (value: boolean) => void;
	}) => {
		const [selected, setSelected] = useState<boolean>(false);
		return (
			<Box
				component='tr'
				key={row.id}
				sx={{ backgroundColor: (theme) => (selected ? theme.vars.palette.background.level2 : 'inherit') }}
				onClick={() => {
					console.log('selecred: ', row.id);
					console.log('selecred: ', selected);
					setSelected(!selected);
				}}>
				<td>{row.id}</td>
				<td>{row.categories?.map((c) => c.name).join(', ') ?? 'not found'}</td>
				<td>{row.question}</td>
				<td>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						{row.correctAnswers.map((a) => (
							<Sheet key={a} variant='soft' sx={{ p: '0.3rem', borderRadius: '0.3rem' }}>
								{a}
							</Sheet>
						))}
					</Box>
				</td>
				<td align='center'>
					<IconButton
						onClick={() => {
							editElement(row);
						}}>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => removeElement(row.id)}>
						<DeleteOutlineIcon />
					</IconButton>
				</td>
			</Box>
		);
	}
);
