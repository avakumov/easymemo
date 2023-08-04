import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import AdminDrawer from '../components/Drawer/AdminDrawer';
import Questions2 from '../components/Questions/Questions2';

const AdminPage = () => {
	const [params, setParams] = useSearchParams();
	const name = params.get('show');

	return (
		<Box sx={{ display: 'flex' }}>
			<AdminDrawer />
			<Show entityName={name} />
		</Box>
	);
};

type ShowProps = {
	entityName: string | null;
};
function Show({ entityName }: ShowProps) {
	switch (entityName) {
		case 'users':
			return <Box>Users</Box>;
		case 'questions':
			return <Questions2 />;
		case 'categories':
			return <Box>Categories</Box>;
		default:
			return <Box>Main</Box>;
	}
}

export default AdminPage;
