import { createBrowserRouter } from 'react-router-dom';
import settings from '../../settings';
import Error404 from '../Error404/Error404';
import MainAuthLayout from '../layouts/MainAuthLayout';
import PracticeFilterModal from '../modals/PracticeFilterModal';
import Practice from '../Practice/Practice';
import Records from '../Records/Records';

const router = createBrowserRouter(
	[
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
			path: '*',
			element: <Error404 />,
		},
	],
	{
		basename: settings.URL_PREFIX,
	}
);

export default router;