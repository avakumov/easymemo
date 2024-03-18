import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import { IQuestion } from '../../types';
import Question from '../Question/Question';

type QuestionsListProps = {
	questions: IQuestion[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
	return (
		<Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column' }}>
			{questions.map((question) => (
				<Box key={question.id}>
					<Question question={question} />
					<Divider orientation='horizontal' sx={{ m: 1 }} />
				</Box>
			))}
		</Box>
	);
}
