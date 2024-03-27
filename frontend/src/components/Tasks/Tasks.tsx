import { Box, Button } from '@mui/joy';
import { service } from '../../store/service';

function Tasks() {
	return (
		<Box>
			<Button onClick={() => service.showMessage('Hello', 'info')}>show message</Button>
		</Box>
	);
}

export default Tasks;
