import React from 'react';

import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';

const Root = styled.div`
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`;

const theme = createTheme({});

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
		element: <AdminPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
