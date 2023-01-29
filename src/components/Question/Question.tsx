import styled from 'styled-components';

export interface QuestionProps {
	question: string;
	keys: string;
}

const Root = styled.div`
	color: ${(props: { active: boolean }) => (props.active ? 'blue' : 'inherit')};
`;

const Question = ({ q, active }: { q: QuestionProps; active: boolean }) => {
	return <Root active={active}>{q.question}</Root>;
};

export default Question;
