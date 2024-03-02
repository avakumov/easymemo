import { Box } from '@mui/joy';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import Error404 from '../Error404/Error404';
import Fallback from '../Fallback/Fallback';
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
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>
					<Practice />
					<PracticeFilterModal />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/records',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>
					<Records />
					<FormEntityModal />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/stats',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>stats</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/audios',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>
					<AudioRecorder />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/slides',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
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
			</ErrorBoundary>
		),
	},
	{
		path: '/registration',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<Registration />
			</ErrorBoundary>
		),
	},
	{
		path: '/login',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<Login />
			</ErrorBoundary>
		),
	},
	{
		path: '*',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<Error404 />
			</ErrorBoundary>
		),
	},
]);

export default router;
