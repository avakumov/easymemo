import { Box } from '@mui/joy';
import { lazy, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import { EntityNames, PageContextType } from '../../types';
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
import PageContext from '../PageContext/PageContext';
import Practice from '../Practice/Practice';
import Records from '../Records/Records';
import Registration from '../Registration/Registration';
import Splider from '../Slider/Slider';

const Posts = lazy(() => import('../Posts/Posts'));

type Route = {
	name: string;
	path: string;
	element: ReactNode;
	layout?: any;
	context?: PageContextType;
};

const routes: Route[] = [
	{
		name: 'practice',
		path: '/',
		layout: MainAuthLayout,
		element: (
			<>
				<Practice />
				<PracticeFilterModal />
			</>
		),
		context: { page: 'practice' },
	},
	{
		name: 'questions',
		path: '/records/questions/:page',
		element: <Records entityName={EntityNames.QUESTION} />,
		layout: MainAuthLayout,
		context: { page: 'questions' },
	},
	{
		name: 'categories',
		path: '/records/categories/:page',
		element: <Records entityName={EntityNames.CATEGORY} />,
		layout: MainAuthLayout,
		context: { page: 'categories' },
	},
	{
		name: 'users',
		path: '/records/users/:page',
		element: <Records entityName={EntityNames.USER} />,
		layout: MainAuthLayout,
		context: { page: 'users' },
	},

	{
		name: 'posts',
		path: '/posts',
		element: <Posts />,
		layout: MainAuthLayout,
		context: { page: 'posts', suspense: true },
	},
	{
		name: 'books',
		path: '/books',
		layout: MainAuthLayout,
		element: <Books />,
		context: { page: 'books' },
	},
	{
		name: 'audios',
		path: '/audios',
		layout: MainAuthLayout,
		element: <AudioRecorder />,
		context: { page: 'audio' },
	},
	{
		name: 'slides',
		path: '/slides',
		layout: MainAuthLayout,
		element: <Splider />,
		context: { page: 'slides' },
	},
	{
		name: 'tasks',
		path: '/tasks',
		layout: MainAuthLayout,
		element: 'tasks',
		context: { page: 'tasks' },
	},
	{
		name: 'login',
		path: '/login',
		element: <Login />,
		context: { page: 'login' },
	},
	{
		name: 'registration',
		path: '/registration',
		element: <Registration />,
		context: { page: 'registration' },
	},
	{
		name: '404',
		path: '*',
		element: <Error404 />,
		context: { page: '404' },
	},
];

const EmptyWrapper = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};
const SuspensePrepared = ({ children }: { children: ReactNode }) => {
	return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
const router = createBrowserRouter(
	routes.map((route) => {
		const Layout = route.layout ?? EmptyWrapper;
		const Suspense = route.context?.suspense ? SuspensePrepared : EmptyWrapper;
		return {
			path: route.path,
			element: (
				<ErrorBoundary FallbackComponent={Fallback}>
					<PageContext context={route.context}>
						<Layout>
							<Suspense>{route.element}</Suspense>
						</Layout>
					</PageContext>
				</ErrorBoundary>
			),
		};
	})
);

export default router;
