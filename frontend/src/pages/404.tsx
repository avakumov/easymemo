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
			<Typography level='h1'>ERROR 404</Typography>
			<Typography>The page you’re looking for doesn’t exist.</Typography>
			<Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
				<Button onClick={() => navigate('/', { replace: false })}>Go home</Button>
			</Box>
		</Box>
	);
}
