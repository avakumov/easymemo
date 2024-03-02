import React from 'react';
import '@fontsource/inter';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Message from './components/Message/Message';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';
import router from './components/Router/Router';
import './index.css';

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
