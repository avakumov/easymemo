import { Box } from '@mui/joy';
import { createBrowserRouter } from 'react-router-dom';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import Error404 from '../Error404/Error404';
import MainAuthLayout from '../layouts/MainAuthLayout';
import Login from '../Login/Login';
import FormEntityModal from '../modals/FormEntityModal';
import PracticeFilterModal from '../modals/PracticeFilterModal';
import Practice from '../Practice/Practice';
import Records from '../Records/Records';
import Registration from '../Registration/Registration';
import Splider from '../Slider/Slider';

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
				<FormEntityModal />
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
		path: '/slides',
		element: (
			<MainAuthLayout>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
						flexDirection: 'column',
						height: 'calc(100vh - var(--Header-height))',
					}}>
					<Splider />
				</Box>

				<FormEntityModal />
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
