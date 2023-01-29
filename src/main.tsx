import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Question from './components/Question/Question';

const data: QuestionI[] = [
	{ question: 'Перейти на начало следующего слова', keys: 'w' },
	{ question: 'Перейти на конец следующего слова', keys: 'e' },
];

export interface QuestionI {
	question: string;
	keys: string;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App questions={data} />
	</React.StrictMode>
);

function App({ questions }: { questions: QuestionI[] }) {
	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler, true);
		return () => document.removeEventListener('keydown', keyDownHandler, true);
	}, []);

	const [activeQ, setActiveQ] = useState(questions[0] ?? null);
	const [keysChain, setkeysChain] = useState('');

	useEffect(() => {
		console.log('effect');
		if (keysChain === activeQ.keys) {
			const index = questions.indexOf(activeQ);
			if (questions.length - 1 === index) {
				setActiveQ(questions[0]);
				setkeysChain('');
			} else {
				setActiveQ(questions[index + 1]);
				setkeysChain('');
			}
		}
	}, [keysChain]);

	function keyDownHandler(this: Document, e: globalThis.KeyboardEvent) {
		console.log('key: ', e.key);
		const key = e.key;
		if (key === 'Escape') {
			setkeysChain('');
		} else {
			setkeysChain((prev) => prev + key);
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}>
			{questions.map((q: QuestionI) => (
				<Question q={q} active={q.keys === activeQ.keys} key={q.keys} />
			))}
			<div style={{ position: 'absolute', bottom: 0, right: 0, padding: '5px' }}>{keysChain}</div>
		</div>
	);
}

export default App;
