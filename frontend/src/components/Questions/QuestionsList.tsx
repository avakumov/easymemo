import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import LinkIcon from '@mui/icons-material/Link';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { IQuestion } from '../../types';
import { Link, Sheet } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type QuestionsListProps = {
	questions: IQuestion[];
	remove: (id: number) => void;
	edit: (q: IQuestion) => void;
};
type QuestionMenuProps = {
	removeItem: () => void;
	editItem: () => void;
};

function QuestionMenu({ removeItem, editItem }: QuestionMenuProps) {
	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
				<MoreHorizRoundedIcon />
			</MenuButton>
			<Menu size='sm'>
				<MenuItem>
					<IconButton onClick={editItem}>
						<EditIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
				<Divider />
				<MenuItem color='danger'>
					<IconButton onClick={removeItem}>
						<DeleteOutlineIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}

export default function QuestionsList({ questions, remove, edit }: QuestionsListProps) {
	return (
		<Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column' }}>
			{questions.map((question) => (
				<Box key={question.id}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'start',
						}}>
						<Box
							sx={{
								display: 'flex',
								gap: 0,
								flexDirection: 'column',
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
										sx={{
											p: '0.3rem',
											borderRadius: '0.3rem',
											overflowWrap: 'anywhere',
										}}>
										{a}
									</Sheet>
								))}
							</Box>
							<Box sx={{ display: 'flex', gap: 1 }}>
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
							<QuestionMenu removeItem={() => remove(question.id)} editItem={() => edit(question)} />
						</Box>
					</Box>
					<Divider orientation='horizontal' sx={{ m: 1 }} />
				</Box>
			))}
		</Box>
	);
}
