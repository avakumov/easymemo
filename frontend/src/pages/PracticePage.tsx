import { Sheet } from '@mui/joy';
import PracticeFilter from '../components/filters/PracticeFilter';
import Practice from '../components/Practice/Practice';

export default function RecordsPage() {
	return (
		<Sheet sx={{ display: 'flex', gap: 1, p: 2, flexDirection: 'column', maxWidth: '1200px', margin: 'auto' }}>
			<PracticeFilter />
			<Practice />
		</Sheet>
	);
}
