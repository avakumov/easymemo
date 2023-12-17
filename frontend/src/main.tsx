import React from 'react';
import '@fontsource/inter';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, Grid } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Page404 from './pages/404';
import ThemesProvider from './components/ThemesProvider/ThemesProvider';
import Message from './components/Message/Message';
import RecordsPage from './pages/RecordsPage';
import Auth from './components/Auth/Auth';
import PracticePage from './pages/PracticePage';
import Sidebar from './components/Sidebar/Sidebar';
import { CssVarsProvider } from '@mui/joy/styles';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>main page</div>,
	},
	{
		path: '/practice',
		element: (
			<Auth>
				<Grid container margin='auto' sx={{ flexWrap: 'nowrap' }} spacing={1}>
					<Grid
						item
						md='auto'
						xs='auto'
						lg='auto'
						xl='auto'
						sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}>
						<Sidebar />
					</Grid>
					<Grid item md={12} sm={12} xs={12} lg={10} xl={10} mr={2}>
						<PracticePage />
					</Grid>
				</Grid>
			</Auth>
		),
	},
	{
		path: '/records',
		element: (
			<Auth>
				<Grid container margin='auto' sx={{ flexWrap: 'nowrap' }} spacing={1}>
					<Grid
						item
						md='auto'
						xs='auto'
						lg='auto'
						xl='auto'
						sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}>
						<CssVarsProvider>
							<Sidebar />
						</CssVarsProvider>
					</Grid>
					<Grid item md={12} sm={12} xs={12} lg={10} xl={10} mr={2}>
						<RecordsPage />
					</Grid>
				</Grid>
			</Auth>
		),
	},
	{
		path: '/stats',
		element: (
			<Auth>
				<Grid container margin='auto' sx={{ flexWrap: 'nowrap' }} spacing={1}>
					<Grid
						item
						md='auto'
						xs='auto'
						lg='auto'
						xl='auto'
						sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}>
						<Sidebar />
					</Grid>
					<Grid item md={12} sm={12} xs={12} lg={10} xl={10} mr={2}>
						<div>stats</div>
					</Grid>
				</Grid>
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
			<CssBaseline />
			<RouterProvider router={router} />
			<Message />
		</Provider>
	</React.StrictMode>
);
