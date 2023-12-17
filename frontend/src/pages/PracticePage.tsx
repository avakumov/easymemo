import { Grid } from '@mui/joy';
import PracticeFilter from '../components/filters/PracticeFilter';
import Practice from '../components/Practice/Practice';

export default function RecordsPage() {
	return (
		<Grid container margin='auto' sx={{ flexWrap: 'nowrap' }} spacing={1}>
			<Grid
				md='auto'
				xs='auto'
				lg='auto'
				xl='auto'
				sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}>
				<PracticeFilter />
			</Grid>
			<Grid md={12} sm={12} xs={12} lg={10} xl={10} mr={2}>
				<Practice />
			</Grid>
		</Grid>
	);
}
