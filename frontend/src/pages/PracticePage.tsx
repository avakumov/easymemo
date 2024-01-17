import { Sheet } from '@mui/joy';
import PracticeFilterModal from '../components/modals/PracticeFilterModal';
import Practice from '../components/Practice/Practice';

export default function RecordsPage() {
	return (
		<Sheet
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1,
				p: 1,
				pt: 2,
				maxWidth: '1200px',
				margin: 'auto',
			}}>
			<Practice />

			<PracticeFilterModal />
		</Sheet>
	);
}
