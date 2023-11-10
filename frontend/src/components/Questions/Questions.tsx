import { Box, IconButton } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import { entityModalOpen } from '../../store/reducers/FormEntityModalReducer';
import { EntityNames } from '../../types';

const Questions = () => {
	const { data: questions, error, isLoading } = api.useGetQuestionsQuery();
	console.log(error);
	const dispatch = useDispatch();

	if (isLoading) return <Loading />;

	if (error && 'status' in error) return <BasicAlert type='error' message={JSON.stringify(error.status)} />;
	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell>categoies</TableCell>
						<TableCell align='right'>Question</TableCell>
						<TableCell>Answer</TableCell>
						<TableCell>edit</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{map(questions, (row) => (
						<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell>{row.categories?.map((c) => c.name).join(', ') ?? 'not found'}</TableCell>
							<TableCell align='right'>{row.question}</TableCell>
							<TableCell>{row.answer}</TableCell>
							<TableCell>
								<IconButton
									sx={{ color: 'text.primary' }}
									size='small'
									onClick={() =>
										dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: row, open: true }))
									}>
									<EditIcon fontSize='inherit' />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Questions;
