import React from 'react';

import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mainTheme } from './themes/theme';
import AdminPage from './pages/Admin';
import { token } from './serivices/auth';
import Login from './components/Login/Login';

const Root = styled.div`
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`;

function getAdminPages() {
	const auth = token.getToken() ? true : false;
	return auth ? <AdminPage /> : <Login />;
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
		path: '/admin/*',
		element: getAdminPages(),
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
