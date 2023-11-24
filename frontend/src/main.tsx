import React from 'react';

import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AdminPage from './pages/Admin';
import { token } from './services/auth';
import Login from './components/Login/Login';
import Page404 from './pages/404';
import ThemesProvider from './components/ThemesProvider/ThemesProvider';
import Message from './components/Message/Message';

const Root = styled.div`
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`;

function getAdminPages() {
	const auth = token.getToken() ? true : false;
	const href = window.location.href;
	return auth ? <AdminPage /> : <Login href={href} />;
}

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Root>
				<App questions={[]} />
			</Root>
		),
	},
	{
		path: '/admin',
		element: getAdminPages(),
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
