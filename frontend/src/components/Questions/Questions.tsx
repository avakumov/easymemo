import api from '../../services/ApiService';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Alert, Box } from '@mui/joy';
import QuestionsTable from './QuestionsTable';
import QuestionsList from './QuestionsList';
import Paginator from '../Paginator/Paginator';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { toPositiveNumber } from '../../utils';
import { service } from '../../store/service';

const Questions = () => {
	const dispatch = useDispatch();

	//получаем текущую страницу из параметров
	const currentPage = toPositiveNumber(useParams().page);
	//остальные переменные из redux state
	const { perPage } = useSelector((state: RootState) => state.paginator);
	const enabledFilter = useSelector((state: RootState) => state.filters.questions.enabled);
	const filter = useSelector((state: RootState) => state.filters.questions.filter);

	const { data, error, isLoading } = api.useGetQuestionsQuery({
		take: perPage,
		skip: currentPage === 1 ? 0 : (currentPage - 1) * perPage,
		search: useSelector((state: RootState) => state.search.searchText),
		filter: enabledFilter ? filter : null,
	});

	//показ сообщения о количестве найденных записей
	useEffect(() => {
		data?.total && service.showMessage(`${data?.total} total records`, 'info');
	}, [data?.total, dispatch]);

	if (isLoading) return <Loading />;

	if (error && 'status' in error) return <Alert color='danger'>{JSON.stringify(error.status)}</Alert>;
	if (typeof data?.questions === 'undefined') return null;

	return (
		<>
			<Box id='start_list_questions'></Box>
			<QuestionsTable questions={data.questions} />
			<QuestionsList questions={data.questions} />
			<Paginator
				total={data.total}
				callback={() => {
					//прокрутка в начало данных
					//TODO переделать
					const scroll = () => {
						const start_list_questions = document.querySelector('#start_list_questions');
						start_list_questions?.scrollIntoView({ block: 'nearest', inline: 'start', behavior: 'smooth' });
					};
					setTimeout(scroll, 200);
				}}
			/>
		</>
	);
};

export default Questions;
