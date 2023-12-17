import { Box } from '@mui/joy';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories/Categories';
import TableInfo from '../components/info/TableInfo';
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
			<Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
				<TableInfo name={name} handlePlus={() => {}} />
			</Box>

			<Box sx={{ mt: 2 }}>
				<Show entityName={name} />
			</Box>

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
