import { Box, Grid, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories/Categories';
import TableInfo from '../components/info/TableInfo';
import AdminLeftMenu from '../components/menu/AdminLeftMenu';
import FormEntityModal from '../components/modals/FormEntityModal';
import Questions from '../components/Questions/Questions';
import Users from '../components/Users/Users';
import { EntityName, EntityNames } from '../types';

const AdminPage = () => {
	const [params] = useSearchParams();
	const name = params.get('show');

	return (
		<>
			<Grid container spacing={2} margin='auto'>
				<Grid item xs='auto'>
					<Paper>
						<AdminLeftMenu />
					</Paper>
				</Grid>
				<Grid item xs={10}>
					<Paper>
						<TableInfo name={name} handlePlus={() => {}} />
					</Paper>
					<Paper sx={{ mt: 1 }}>
						<Show entityName={name} />
					</Paper>
				</Grid>
			</Grid>

			<FormEntityModal />
		</>
	);
};

function Show({ entityName }: { entityName: EntityName }) {
	switch (entityName) {
		case EntityNames.USER:
			return <Users />;
		case EntityNames.QUESTION:
			return <Questions />;
		case EntityNames.CATEGORY:
			return <Categories />;
		default:
			return <Box>Main</Box>;
	}
}

export default AdminPage;
