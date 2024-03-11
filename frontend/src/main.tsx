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
import FormEntityModal from './components/modals/FormEntityModal';
import theme from './stories/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CssVarsProvider theme={theme}>
			<Provider store={store}>
				<CssBaseline />
				<RouterProvider router={router} />
				<Message />
				<FormEntityModal />
			</Provider>
		</CssVarsProvider>
	</React.StrictMode>
);
