import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Search from '../Search/Search';

export default function BarActions() {
	return (
		<Sheet
			sx={{
				display: 'flex',
				gap: 1,
				p: 1,
				boxShadow: 'sm',
			}}>
			<Search />
		</Sheet>
	);
}
