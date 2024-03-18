import { Box } from '@mui/joy';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import HighlightSearch from '../HighlightSearch/HighlightSearch';
import Sidebar from '../Sidebar/Sidebar';

const MainAuthLayout = ({ children }: { children: ReactNode }) => {
	const page = useSelector((state: RootState) => state.pageContext.page);

	function getPaddings(page: string | undefined): any {
		switch (page) {
			case 'slides':
				return 0;
			default:
				return { xs: 1, md: 2 };
		}
	}
	return (
		<Box sx={{ display: 'flex' }}>
			<Header page={page} />
			<Sidebar />
			<Box
				component='main'
				sx={{
					mt: {
						xs: 'calc(var(--Header-height))',
						sm: 'calc(var(--Header-height))',
					},
					display: 'flex',
					width: '100%',
					height: '100%',
					p: getPaddings(page),
					overflowX: 'auto',
				}}>
				<HighlightSearch>{children}</HighlightSearch>
			</Box>
		</Box>
	);
};

export default MainAuthLayout;
