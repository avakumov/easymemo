import api from '../../services/ApiService';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { EntityNames, IQuestion } from '../../types';
import { useCallback, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Alert, IconButton } from '@mui/joy';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { showMessage } from '../../store/slices/messageSlice';
import QuestionsTable from './QuestionsTable';
import QuestionsList from './QuestionsList';
import Paginator from '../Paginator/Paginator';
import settings from '../../settings';

const per_page = settings.lists.PER_PAGE;

const Questions = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { data, error, isLoading } = api.useGetQuestionsQuery({
		take: per_page,
		skip: currentPage === 1 ? 0 : (currentPage - 1) * per_page,
	});
	const [removeEntity] = api.useRemoveEntityMutation();

	const editElement = useCallback(
		(question: IQuestion) => {
			dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: question, open: true }));
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
	if (typeof data?.questions === 'undefined') return null;

	return (
		<>
			<IconButton
				sx={{ position: 'fixed', right: '30px', top: '80px', zIndex: 1000 }}
				variant='soft'
				color='primary'
				onClick={() => dispatch(entityModalOpen({ name: EntityNames.QUESTION, open: true }))}>
				<AddCircleOutlineIcon />
			</IconButton>
			<QuestionsTable questions={data.questions} remove={removeElementCallback} edit={editElement} />
			<QuestionsList questions={data.questions} remove={removeElementCallback} edit={editElement} />
			<Paginator
				currentPage={currentPage}
				pagesCount={Math.ceil(data.total / per_page)}
				setPage={setCurrentPage}
			/>
		</>
	);
};

export default Questions;
