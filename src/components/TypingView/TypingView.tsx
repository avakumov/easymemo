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
`;

const TypingView = ({ typingText }: { typingText: string }) => {
	return <Root>{typingText}</Root>;
};

export default TypingView;
