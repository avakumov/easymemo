import { Box } from '@mui/material';
import api from '../../serivices/ApiService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Questions2 = () => {
	const { data: questions, error, isLoading } = api.useFetchQuestionsQuery();
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell align='right'>Question</TableCell>
						<TableCell>Answer</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{questions &&
						questions.map((row) => (
							<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell align='right'>{row.question}</TableCell>
								<TableCell>{row.answer}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Questions2;
