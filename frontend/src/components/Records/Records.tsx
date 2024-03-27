import { Box } from '@mui/joy';
import { EntityName, EntityNames } from '../../types';
import Categories from '../Categories/Categories';
import Error404 from '../Error404/Error404';
import Questions from '../Questions/Questions';
import Users from '../Users/Users';

export default function Records({ entityName }: { entityName: EntityName | undefined | string }) {
	return (
		<Box sx={{ width: '100%' }}>
			<Show entityName={entityName} />
		</Box>
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
