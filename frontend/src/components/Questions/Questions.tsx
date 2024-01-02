import api from '../../services/ApiService';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';
import { EntityNames, IQuestion } from '../../types';
import { useCallback } from 'react';
import { Alert } from '@mui/joy';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { showMessage } from '../../store/slices/messageSlice';
import QuestionsTable from './QuestionsTable';
import QuestionsList from './QuestionsList';

const Questions = () => {
	const dispatch = useDispatch();
	const { data: questions, error, isLoading } = api.useGetQuestionsQuery();
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
	if (typeof questions === 'undefined') return null;

	return (
		<>
			<QuestionsTable questions={questions} remove={removeElementCallback} edit={editElement} />
			<QuestionsList questions={questions} remove={removeElementCallback} edit={editElement} />
		</>
	);
};

export default Questions;
