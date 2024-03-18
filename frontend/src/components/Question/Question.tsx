import { Box, Link, Sheet, Typography } from '@mui/joy';
import { IQuestion } from '../../types';
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import LinkIcon from '@mui/icons-material/Link';

type QuestionProps = {
	question: IQuestion;
};

export default function Question({ question }: QuestionProps) {
	return (
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
	);
}
