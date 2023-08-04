import { Box } from '@mui/material';
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

const Categories = () => {
	const { data: categories, error, isLoading } = api.useGetCategoriesQuery();
	if (isLoading) return <Loading />;
	if (error) return <BasicAlert type='error' message={error?.error} />;
	return (
		<TableContainer>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell align='right'>name</TableCell>
						<TableCell>description</TableCell>
						<TableCell>published</TableCell>
						<TableCell>createdAt</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{map(categories, (row) => (
						<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell align='right'>{row.name}</TableCell>
							<TableCell>{row.description}</TableCell>
							<TableCell>{row.published}</TableCell>
							<TableCell>{row.createdAt}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Categories;
