import Search from '../Search/Search';
import { SxProps } from '@mui/joy/styles/types';
import { Box } from '@mui/joy';
import { QuestionsFilterButton } from '../buttons/FilterButtons';
import AddElement from '../buttons/AddElement';

export default function BarActions({ sx }: { sx?: SxProps }) {
	return (
		<Box sx={sx}>
			<Box
				sx={{
					display: 'flex',
					gap: 1,
				}}>
				<Search sx={{ display: 'flex', gap: 1 }} />
				<QuestionsFilterButton />
				<AddElement sx={{ ml: 'auto' }} />
			</Box>
		</Box>
	);
}
