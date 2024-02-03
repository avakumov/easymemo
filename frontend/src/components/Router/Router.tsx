import { createBrowserRouter } from 'react-router-dom';
import Error404 from '../Error404/Error404';
import MainAuthLayout from '../layouts/MainAuthLayout';
import PracticeFilterModal from '../modals/PracticeFilterModal';
import Practice from '../Practice/Practice';
import Records from '../Records/Records';
import Registration from '../Registration/Registration';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<MainAuthLayout>
				<Practice />
				<PracticeFilterModal />
			</MainAuthLayout>
		),
	},
	{
		path: '/records',
		element: (
			<MainAuthLayout>
				<Records />
			</MainAuthLayout>
		),
	},
	{
		path: '/stats',
		element: <MainAuthLayout>stats</MainAuthLayout>,
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '*',
		element: <Error404 />,
	},
]);

export default router;
