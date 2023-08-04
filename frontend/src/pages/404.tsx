import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = purple[900];

export default function Page404() {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				minHeight: '100vh',
				backgroundColor: primary,
			}}>
			<Typography variant='h1' style={{ color: 'white' }}>
				404
			</Typography>
			<Typography variant='h6' style={{ color: 'white' }}>
				The page you’re looking for doesn’t exist.
			</Typography>
			<Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', marginTop: 1 }}>
				<Button variant='contained' onClick={() => navigate('/', { replace: false })}>
					Home
				</Button>
				<Button variant='contained' onClick={() => navigate('/admin', { replace: false })}>
					Admin home
				</Button>
			</Box>
		</Box>
	);
}
