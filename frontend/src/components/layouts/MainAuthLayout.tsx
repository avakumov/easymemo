import { Box } from '@mui/joy';
import { ReactNode } from 'react';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const MainAuthLayout = ({ children, page }: { children: ReactNode; page?: string }) => {
	function getPaddings(page: string | undefined): any {
		switch (page) {
			case 'slides':
				return 0;
			default:
				return { sm: 1, md: 2 };
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
					justifyContent: 'center',
					width: '100%',
					p: getPaddings(page),
				}}>
				{children}
			</Box>
		</Box>
	);
};

export default MainAuthLayout;
