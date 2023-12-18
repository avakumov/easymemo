import { Sheet } from '@mui/joy';
import PracticeFilterModal from '../components/modals/PracticeFilterModal';
import Practice from '../components/Practice/Practice';

export default function RecordsPage() {
	return (
		<Sheet sx={{ display: 'flex', gap: 1, p: 2, flexDirection: 'column', maxWidth: '1200px', margin: 'auto' }}>
			<Practice />

			<PracticeFilterModal />
		</Sheet>
	);
}
