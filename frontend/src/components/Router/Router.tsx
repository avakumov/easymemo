import { Box } from '@mui/joy';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import { EntityNames } from '../../types';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import BarActions from '../BarActions/BarActions';
import Error404 from '../Error404/Error404';
import Fallback from '../Fallback/Fallback';
import MainAuthLayout from '../layouts/MainAuthLayout';
import Login from '../Login/Login';
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
				<MainAuthLayout page='practice'>
					<Practice />
					<PracticeFilterModal />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/records/questions/:page',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout page='questions'>
					<Records entityName={EntityNames.QUESTION} />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/records/categories/:page',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout page='categories'>
					<Records entityName={EntityNames.CATEGORY} />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/records/users/:page',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout page='users'>
					<Records entityName={EntityNames.USER} />
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/tasks',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>tasks</MainAuthLayout>
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
				<MainAuthLayout page='slides'>
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
