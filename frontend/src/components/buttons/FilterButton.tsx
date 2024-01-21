import { IconButton } from '@mui/joy';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function FilterButton({ disabled = false, ...props }: { disabled?: boolean; [x: string]: any }) {
	return (
		<IconButton {...props} variant='soft' color='primary' title='Open filters'>
			{disabled ? <FilterAltOffIcon /> : <FilterAltIcon />}
		</IconButton>
	);
}
