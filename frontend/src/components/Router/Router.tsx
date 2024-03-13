import { Box } from '@mui/joy';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import { EntityNames } from '../../types';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import BarActions from '../BarActions/BarActions';
import Books from '../Books/Books';
import Error404 from '../Error404/Error404';
import Fallback from '../Fallback/Fallback';
import MainAuthLayout from '../layouts/MainAuthLayout';
import Loading from '../Loading/Loading';
import Login from '../Login/Login';
import MarkdownEdit from '../MarkdownEdit/MarkdownEdit';
import PracticeFilterModal from '../modals/PracticeFilterModal';
import Practice from '../Practice/Practice';
import Records from '../Records/Records';
import Registration from '../Registration/Registration';
import Splider from '../Slider/Slider';
const Posts = lazy(() => import('../Posts/Posts'));
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
		path: '/posts',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>
					<Suspense fallback={<Loading />}>
						<Posts />
					</Suspense>
				</MainAuthLayout>
			</ErrorBoundary>
		),
	},
	{
		path: '/books',
		element: (
			<ErrorBoundary FallbackComponent={Fallback}>
				<MainAuthLayout>
					<Books />
				</MainAuthLayout>
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
					<Splider />
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
