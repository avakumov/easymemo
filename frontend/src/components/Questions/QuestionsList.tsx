import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import LinkIcon from '@mui/icons-material/Link';
import { IQuestion } from '../../types';
import { Link, Sheet } from '@mui/joy';
import QuestionMenu from '../QuestionMenu/QuestionMenu';

type QuestionsListProps = {
	questions: IQuestion[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
	return (
		<Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column' }}>
			{questions.map((question) => (
				<Box key={question.id}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'start',
							pl: 1,
						}}>
						<Box
							sx={{
								display: 'flex',
								gap: 0,
								flexDirection: 'column',
								flexBasis: '100%',
							}}>
							<Box>
								<Typography sx={{ mb: 1 }}>{question.question}</Typography>
							</Box>

							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}>
								{question.rightAnswers.split(' |-| ').map((a) => (
									<Sheet
										key={a}
										variant='soft'
										color='primary'
										sx={{
											p: '0.3rem',
											borderRadius: '0.3rem',
											overflowWrap: 'anywhere',
										}}>
										{a}
									</Sheet>
								))}
							</Box>
							<Box sx={{ display: 'flex', gap: 1, fontStyle: 'italic', px: 1, py: 0.5 }}>
								{question.categories.map((category) => (
									<Typography key={category.id} level='body-xs'>
										{category.name}
									</Typography>
								))}
							</Box>
						</Box>

						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
							{question.url ? (
								<Link href={question.url} target='_blank' title={question.url}>
									<LinkIcon />
								</Link>
							) : null}
							<QuestionMenu questionId={question.id} />
						</Box>
					</Box>
					<Divider orientation='horizontal' sx={{ m: 1 }} />
				</Box>
			))}
		</Box>
	);
}
