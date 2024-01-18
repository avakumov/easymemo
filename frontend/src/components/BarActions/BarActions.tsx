import Search from '../Search/Search';
import AddElement from '../AddElement/AddElement';
import { SxProps } from '@mui/joy/styles/types';
import { Box } from '@mui/joy';

export default function BarActions({ sx }: { sx?: SxProps }) {
	return (
		<Box sx={sx}>
			<Box
				sx={{
					display: 'flex',
					gap: 1,
					p: 1,
				}}>
				<Search sx={{ display: 'flex', gap: 1 }} />
				<AddElement sx={{ ml: 'auto' }} />
			</Box>
		</Box>
	);
}
