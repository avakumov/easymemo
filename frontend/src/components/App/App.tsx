import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Question, { QuestionProps } from '../Question/Question';
import TypingView from '../TypingView/TypingView';

const Root = styled.div`
	@font-face {
		font-family: 'Iosevka';
		font-style: normal;
		src: url('fonts/iosevka') format('truetype');
	}
	font-family: 'Iosevka';
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

function App({ questions }: { questions: QuestionProps[] }) {
	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler, true);
		document.addEventListener('keyup', keyUpHandler, true);
		return () => {
			document.removeEventListener('keydown', keyDownHandler, true);
			document.removeEventListener('keyup', keyUpHandler, true);
		};
	}, []);

	const [activeQ, setActiveQ] = useState(questions[0] ?? {});
	const [typingText, setTypingText] = useState('');

	useEffect(() => {
		if (typingText === activeQ.answer) {
			//Небольшая задержка после правильного ответа
			setTimeout(() => {
				const index = questions.indexOf(activeQ);
				setTypingText('');
				if (questions.length - 1 === index) {
					setActiveQ(questions[0]);
				} else {
					setActiveQ(questions[index + 1]);
				}
			}, 500); //TODO Перенести в settings
		}
	}, [typingText]);

	function keyUpHandler(this: Document, e: globalThis.KeyboardEvent): void {}

	function keyDownHandler(this: Document, e: globalThis.KeyboardEvent) {
		const { key } = e;
		//ignore keys
		const ignoreKeys = ['Shift', 'Control'];
		if (ignoreKeys.find((k) => k === e.key)) {
			return;
		}

		if (key === 'Escape') {
			return setTypingText('');
		}
		if (key === 'Backspace') {
			return setTypingText((prev) => prev.slice(0, -1));
		}

		if (e.ctrlKey) {
			return setTypingText((prev) => `${prev}<C-${key}>`);
		}
		setTypingText((prev) => prev + key);
	}

	return (
		<Root>
			{questions.map((q: QuestionProps) => (
				<Question q={q} active={q.answer === activeQ.answer} key={q.answer} />
			))}
			<TypingView typingText={typingText} highlightText={activeQ.answer} />
		</Root>
	);
}

export default App;
