import { Box } from '@mui/joy';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EntityName, EntityNames } from '../../types';
import Categories from '../Categories/Categories';
import Error404 from '../Error404/Error404';
import FormEntityModal from '../modals/FormEntityModal';
import Questions from '../Questions/Questions';
import Users from '../Users/Users';

export default function Records() {
	const [params, setParams] = useSearchParams();
	let name = params.get('show');

	useEffect(() => {
		if (!params.get('show')) {
			setParams({ show: 'questions' });
		}
	}, [params, setParams]);

	return (
		<>
			<Box sx={{ m: 1 }}>
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
			return <Error404 />;
	}
}
