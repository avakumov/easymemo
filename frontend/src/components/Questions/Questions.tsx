import api from '../../services/ApiService';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { EntityNames, IQuestion } from '../../types';
import { useCallback, useEffect } from 'react';
import { Alert, Box } from '@mui/joy';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { showMessage } from '../../store/slices/messageSlice';
import QuestionsTable from './QuestionsTable';
import QuestionsList from './QuestionsList';
import Paginator from '../Paginator/Paginator';
import { RootState } from '../../store/store';

const Questions = () => {
	const dispatch = useDispatch();
	const { currentPage, perPage } = useSelector((state: RootState) => state.paginator);
	const { data, error, isLoading } = api.useGetQuestionsQuery({
		take: perPage,
		skip: currentPage === 1 ? 0 : (currentPage - 1) * perPage,
		search: useSelector((state: RootState) => state.search.commonTextSearch),
		filter: useSelector((state: RootState) => state.filters.questions.filter),
	});
	const [removeEntity] = api.useRemoveEntityMutation();

	const editElement = useCallback(
		(question: IQuestion) => {
			dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: question, open: true }));
		},
		[dispatch]
	);
	useEffect(() => {
		setTimeout(() => {
			const start_list_questions = document.querySelector('#start_list_questions');
			start_list_questions?.scrollIntoView({ block: 'nearest', inline: 'start', behavior: 'smooth' });
		}, 200);
	}, [data?.questions]);

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
			<Box id='start_list_questions'></Box>
			<QuestionsTable questions={data.questions} remove={removeElementCallback} edit={editElement} />
			<QuestionsList questions={data.questions} remove={removeElementCallback} edit={editElement} />
			<Paginator total={data.total} />
		</>
	);
};

export default Questions;
