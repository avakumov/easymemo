import Search from '../Search/Search';
import { SxProps } from '@mui/joy/styles/types';
import { Box } from '@mui/joy';
import { QuestionsFilter } from '../buttons/Filters';
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
				<QuestionsFilter />
				<AddElement sx={{ ml: 'auto' }} />
			</Box>
		</Box>
	);
}
