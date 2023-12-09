import { Box, Grid, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories/Categories';
import TableInfo from '../components/info/TableInfo';
import AdminMenu from '../components/menu/AdminMenu';
import FormEntityModal from '../components/modals/FormEntityModal';
import Questions from '../components/Questions/Questions';
import Users from '../components/Users/Users';
import { EntityName, EntityNames } from '../types';

export default function RecordsPage() {
	const [params, setParams] = useSearchParams();
	let name = params.get('show');

	useEffect(() => {
		if (!params.get('show')) {
			setParams({ show: 'questions' });
		}
	}, [params, setParams]);

	return (
		<>
			<Grid container margin='auto' sx={{ flexWrap: 'nowrap' }} spacing={1}>
				<Grid
					item
					md='auto'
					xs='auto'
					lg='auto'
					xl='auto'
					sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}>
					<Paper sx={{ position: 'sticky', top: 16, zIndex: 100 }}>
						<AdminMenu />
					</Paper>
				</Grid>
				<Grid item md={12} sm={12} xs={12} lg={10} xl={10} mr={2}>
					<Paper sx={{ position: 'sticky', top: 16, zIndex: 100 }}>
						<TableInfo name={name} handlePlus={() => {}} />
					</Paper>

					<Paper sx={{ mt: 2 }}>
						<Show entityName={name} />
					</Paper>
				</Grid>
			</Grid>

			<FormEntityModal />
		</>
	);
}

function Show({ entityName }: { entityName: EntityName | undefined | null | string }) {
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
