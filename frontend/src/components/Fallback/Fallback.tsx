import { Box, Button } from '@mui/joy';

function Fallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
	return (
		<Box role='alert' sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
			<p>Something went wrong:</p>
			<pre style={{ color: 'red' }}>{error.message}</pre>
			<Button onClick={resetErrorBoundary}>Try again</Button>
		</Box>
	);
}

export default Fallback;
