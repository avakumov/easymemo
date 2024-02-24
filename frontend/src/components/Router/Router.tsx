import { createBrowserRouter } from 'react-router-dom';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import Error404 from '../Error404/Error404';
import MainAuthLayout from '../layouts/MainAuthLayout';
import Login from '../Login/Login';
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
		path: '/audios',
		element: (
			<MainAuthLayout>
				<AudioRecorder />
			</MainAuthLayout>
		),
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <Error404 />,
	},
]);

export default router;
