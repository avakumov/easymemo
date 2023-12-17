import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/joy';

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
			}}>
			<Typography style={{ color: 'white' }}>404</Typography>
			<Typography style={{ color: 'white' }}>The page you’re looking for doesn’t exist.</Typography>
			<Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', marginTop: 1 }}>
				<Button onClick={() => navigate('/', { replace: false })}>Home</Button>
				<Button onClick={() => navigate('/practice', { replace: false })}>Practice</Button>
			</Box>
		</Box>
	);
}
