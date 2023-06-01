import styled from 'styled-components';

export interface QuestionProps {
	question: string;
	answer: string;
}

const Root = styled.div`
	/* color: ${(props: { active: boolean }) => (props.active ? 'blue' : 'inherit')}; */
	display: ${(props: { active: boolean }) => (props.active ? 'flex' : 'none')};
	font-size: 30px;
`;

const Question = ({ q, active }: { q: QuestionProps; active: boolean }) => {
	return <Root active={active}>{q.question}</Root>;
};

export default Question;
