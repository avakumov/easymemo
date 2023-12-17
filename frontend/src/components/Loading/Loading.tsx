import * as React from 'react';
import { Box, CircularProgress } from '@mui/joy';

export default function Loading() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 2,
			}}>
			<CircularProgress />
		</Box>
	);
}
