import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Categories from '../components/Categories/Categories';
import AdminDrawer from '../components/Drawer/AdminDrawer';
import EditModal from '../components/modals/EditModal';
import Questions2 from '../components/Questions/Questions2';
import Users from '../components/Users/Users';

const AdminPage = () => {
	const [params] = useSearchParams();
	const name = params.get('show');

	return (
		<Box sx={{ display: 'flex' }}>
			<AdminDrawer />
			<Show entityName={name} />

			<EditModal />
		</Box>
	);
};

type ShowProps = {
	entityName: string | null;
};
function Show({ entityName }: ShowProps) {
	switch (entityName) {
		case 'users':
			return <Users />;
		case 'questions':
			return <Questions2 />;
		case 'categories':
			return <Categories />;
		default:
			return <Box>Main</Box>;
	}
}

export default AdminPage;
