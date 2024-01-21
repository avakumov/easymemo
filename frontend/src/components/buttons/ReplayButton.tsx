import { IconButton } from '@mui/joy';
import ReplayIcon from '@mui/icons-material/Replay';

export default function ReplayButton({ ...props }) {
	return (
		<IconButton variant='soft' color='primary' title='replay' {...props}>
			<ReplayIcon />
		</IconButton>
	);
}
