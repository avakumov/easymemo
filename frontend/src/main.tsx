import React from 'react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Page404 from './pages/404';
import ThemesProvider from './components/ThemesProvider/ThemesProvider';
import Message from './components/Message/Message';
import Practice from './components/Practice/Practice';
import RecordsPage from './pages/RecordsPage';
import Auth from './components/Auth/Auth';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>main page</div>,
	},
	{
		path: '/practice',
		element: (
			<Auth>
				<Practice />
			</Auth>
		),
	},
	{
		path: '/records',
		element: (
			<Auth>
				<RecordsPage />
			</Auth>
		),
	},
	{
		path: '/stats',
		element: (
			<Auth>
				<div>stats</div>
			</Auth>
		),
	},
	{
		path: '*',
		element: <Page404 />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemesProvider>
				<CssBaseline />
				<RouterProvider router={router} />
				<Message />
			</ThemesProvider>
		</Provider>
	</React.StrictMode>
);
