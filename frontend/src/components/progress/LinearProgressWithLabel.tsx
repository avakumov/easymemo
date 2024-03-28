import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

export default function LinearProgressWithLabel() {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
		}, 800);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box
			sx={{
				bgcolor: 'white',
				width: '100%',
			}}>
			<LinearProgress
				determinate
				variant='outlined'
				color='success'
				size='sm'
				thickness={24}
				value={progress}
				sx={{
					'--LinearProgress-radius': '0px',
					'--LinearProgress-progressThickness': '18px',
					boxShadow: 'sm',
					borderColor: 'neutral.500',
				}}>
				<Typography
					level='body-xs'
					fontWeight='xl'
					textColor='common.white'
					sx={{ mixBlendMode: 'difference' }}>
					{`${Math.round(progress)}%`}
				</Typography>
			</LinearProgress>
		</Box>
	);
}
