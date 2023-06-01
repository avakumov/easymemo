import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0.3;
	font-size: 70px;
	font-weight: 600;
	& .highlight {
		color: green;
	}
`;

const TypingView = ({ typingText, highlightText }: { typingText: string; highlightText: string }) => {
	const isContainOnStart = typingText.indexOf(highlightText) === 0;
	let stylingText: React.ReactElement | string = typingText;

	if (isContainOnStart) {
		stylingText = (
			<>
				<span className='highlight'>{highlightText}</span>
				<span>{typingText.slice(highlightText.length)}</span>
			</>
		);
	}
	return <Root>{stylingText}</Root>;
};

export default TypingView;
