import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Question, { QuestionProps } from '../Question/Question';
import TypingView from '../TypingView/TypingView';

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

function App({ questions }: { questions: QuestionProps[] }) {
	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler, true);
		return () => document.removeEventListener('keydown', keyDownHandler, true);
	}, []);

	const [activeQ, setActiveQ] = useState(questions[0] ?? {});
	const [typingText, setTypingText] = useState('');

	useEffect(() => {
		if (typingText === activeQ.keys) {
			const index = questions.indexOf(activeQ);
			setTypingText('');
			if (questions.length - 1 === index) {
				setActiveQ(questions[0]);
			} else {
				setActiveQ(questions[index + 1]);
			}
		}
	}, [typingText]);

	function keyDownHandler(this: Document, e: globalThis.KeyboardEvent) {
		console.log('key: ', e.key);
		const key = e.key;
		if (key === 'Escape') {
			setTypingText('');
		} else {
			setTypingText((prev) => prev + key);
		}
	}

	return (
		<Root>
			{questions.map((q: QuestionProps) => (
				<Question q={q} active={q.keys === activeQ.keys} key={q.keys} />
			))}
			<TypingView typingText={typingText} />
		</Root>
	);
}

export default App;
