import React from 'react';

import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './components/App/App';
import { QuestionProps } from './components/Question/Question';

const data: QuestionProps[] = [
	{ question: 'Перейти на начало следующего слова', keys: 'w' },
	{ question: 'Перейти на конец следующего слова', keys: 'e' },
];

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
			<App questions={data} />
		</Root>
	</React.StrictMode>
);
