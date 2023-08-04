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
import { editModalOpen } from '../../store/reducers/EditModalReducer';

const Questions2 = () => {
	const { data: questions, error, isLoading } = api.useFetchQuestionsQuery();
	const dispatch = useDispatch();

	if (isLoading) return <Loading />;
	if (error) return <BasicAlert type='error' message={error?.error} />;
	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
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
							<TableCell align='right'>{row.question}</TableCell>
							<TableCell>{row.answer}</TableCell>
							<TableCell>
								<IconButton
									sx={{ color: 'text.primary' }}
									size='small'
									onClick={() =>
										dispatch(editModalOpen({ name: 'question', data: row, open: true }))
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

export default Questions2;
