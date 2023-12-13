import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, IconButton } from '@mui/material';
import Menu from './Menu';
import MenuIcon from '@mui/icons-material/Menu';

export default function AdminDrawer() {
	const [state, setState] = React.useState(false);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setState(open);
	};

	return (
		<Box sx={{ display: { xl: 'none', lg: 'none', md: 'block', sm: 'block', xs: 'block' } }}>
			<IconButton onClick={toggleDrawer(true)} size='small' sx={{ color: 'text.primary' }}>
				<MenuIcon />
			</IconButton>
			<Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>
				<Menu />
			</Drawer>
		</Box>
	);
}
