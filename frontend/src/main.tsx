import React from 'react';

import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './components/App/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QuestionProps } from './components/Question/Question';
import data from '../data/nvim.json';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App questions={data} />,
	},
	{
		path: '/admin',
		element: <div>admin</div>,
	},
]);

const Root = styled.div`
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Root>
			<RouterProvider router={router} />
		</Root>
	</React.StrictMode>
);
