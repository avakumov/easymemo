import { IconButton } from '@mui/material';
import api from '../../services/ApiService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Loading from '../Loading/Loading';
import BasicAlert from '../BasicAlert.tsx/BasicAlert';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';
import { EntityNames, IQuestion } from '../../types';
import { showMessage } from '../../store/reducers/messageActions';
import { memo, useCallback, useState } from 'react';
import MultiSelect from '../MultiSelect/MultiSelect';

const Questions = () => {
	const dispatch = useDispatch();
	const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

	const { data: categories } = api.useGetCategoriesQuery();
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
		} catch (e) {
			console.log(e);
			dispatch(showMessage({ type: 'error', message: e?.data?.message ?? 'Error on remove' }));
		}
	}
	const removeElementCallback = useCallback(removeElement, [dispatch, removeEntity]);

	if (isLoading) return <Loading />;

	if (error && 'status' in error) return <BasicAlert type='error' message={JSON.stringify(error.status)} />;

	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell>
							<MultiSelect
								name={EntityNames.CATEGORY}
								selectAll={() => {
									if (Array.isArray(categories)) {
										setCategoryFilter(categories.map((c) => c.name));
									}
								}}
								unSelectAll={() => {
									setCategoryFilter([]);
								}}
								onSelect={(c) => {
									const idx = categoryFilter.findIndex((cat) => cat === c);
									if (idx === -1) {
										setCategoryFilter([...categoryFilter, c]);
									} else {
										setCategoryFilter(categoryFilter.filter((name) => name !== c));
									}
								}}
								selectedItems={categoryFilter}
								items={Array.isArray(categories) ? categories.map((c) => c.name) : []}
							/>
						</TableCell>
						<TableCell align='right'>Question</TableCell>
						<TableCell>Answer</TableCell>
						<TableCell sx={{ minWidth: '100px' }} align='center'>
							edit
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.isArray(questions)
						? questions.map((q) => (
								<TableRowMemo row={q} removeElement={removeElementCallback} editElement={editElement} />
						  ))
						: null}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Questions;

const TableRowMemo = memo(
	({
		row,
		removeElement,
		editElement,
	}: {
		row: IQuestion;
		removeElement: (id: number) => void;
		editElement: (data: IQuestion) => void;
	}) => {
		return (
			<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell component='th' scope='row'>
					{row.id}
				</TableCell>
				<TableCell>{row.categories?.map((c) => c.name).join(', ') ?? 'not found'}</TableCell>
				<TableCell align='right'>{row.question}</TableCell>
				<TableCell>{row.answer}</TableCell>
				<TableCell sx={{ minWidth: '100px' }} align='center'>
					<IconButton
						sx={{ color: 'text.primary' }}
						size='small'
						onClick={() => {
							editElement(row);
						}}>
						<EditIcon fontSize='inherit' />
					</IconButton>
					<IconButton sx={{ color: 'text.primary' }} size='small' onClick={() => removeElement(row.id)}>
						<DeleteOutlineIcon fontSize='inherit' />
					</IconButton>
				</TableCell>
			</TableRow>
		);
	}
);
