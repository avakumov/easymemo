import { Box, Button, Card, CardOverflow, Typography } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import settings from '../../settings';
import { IBook } from '../../types';
import LinearProgressWithLabel from '../progress/LinearProgressWithLabel';

export default function BookCard({ book }: { book: IBook }) {
	return (
		<Card sx={{ width: '250px', height: '500px' }} variant='outlined' color='primary'>
			<CardOverflow>
				<AspectRatio ratio='1/1.41'>
					<img src={book.image} loading='lazy' alt='' />
				</AspectRatio>
			</CardOverflow>
			<CardOverflow>
				<LinearProgressWithLabel />
			</CardOverflow>
			<Typography level='title-lg' title={book.title} noWrap={true}>
				{book.title}
			</Typography>
			<Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'space-between' }}>
				<Button
					variant='soft'
					onClick={() => {
						window.open(`${settings.apiUrl}/files/get/pdf/${book.pdfFilename}#page=1`, '_blank');
					}}>
					Read
				</Button>
				<Button variant='soft'>edit</Button>
			</Box>
		</Card>
	);
}
