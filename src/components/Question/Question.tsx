import { QuestionI } from '../../main';

const Question = ({ q, active }: { q: QuestionI; active: boolean }) => {
	return <div style={{ color: active ? 'blue' : 'inherit' }}>{q.question}</div>;
};

export default Question;
