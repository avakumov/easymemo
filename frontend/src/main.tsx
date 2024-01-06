import React from 'react';
import '@fontsource/inter';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Page404 from './pages/404';
import Message from './components/Message/Message';
import RecordsPage from './pages/RecordsPage';
import Auth from './components/Auth/Auth';
import PracticePage from './pages/PracticePage';
import Sidebar from './components/Sidebar/Sidebar';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline, Box } from '@mui/joy';
import Header from './components/Header/Header';
import './index.css';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <div>Main Page</div>,
		},
		{
			path: '/practice',
			element: (
				<Auth>
					<Box sx={{ display: 'flex' }}>
						<Header />
						<Sidebar />
						<Box
							component='main'
							sx={{
								pt: {
									xs: 'calc(var(--Header-height))',
									sm: 'calc(var(--Header-height))',
								},
								width: '100%',
							}}>
							<PracticePage />
						</Box>
					</Box>
				</Auth>
			),
		},
		{
			path: '/records',
			element: (
				<Auth>
					<Box sx={{ display: 'flex' }}>
						<Header />
						<Sidebar />
						<Box
							component='main'
							sx={{
								pt: {
									xs: 'calc(var(--Header-height))',
									sm: 'calc(var(--Header-height))',
								},
								width: '100%',
							}}>
							<RecordsPage />
						</Box>
					</Box>
				</Auth>
			),
		},
		{
			path: '/stats',
			element: (
				<Auth>
					<Box sx={{ display: 'flex' }}>
						<Header />
						<Sidebar />
						<Box
							component='main'
							sx={{
								pt: {
									xs: 'calc(12px + var(--Header-height))',
									sm: 'calc(12px + var(--Header-height))',
								},
								width: '100%',
							}}>
							stats
						</Box>
					</Box>
				</Auth>
			),
		},
		{
			path: '*',
			element: <Page404 />,
		},
	]
	// {
	// 	basename: '/easymemo',
	// }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CssVarsProvider>
			<Provider store={store}>
				<CssBaseline />
				<RouterProvider router={router} />
				<Message />
			</Provider>
		</CssVarsProvider>
	</React.StrictMode>
);
