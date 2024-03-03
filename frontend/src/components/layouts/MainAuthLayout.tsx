import { Box } from '@mui/joy';
import { ReactNode } from 'react';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const MainAuthLayout = ({ children }: { children: ReactNode }) => (
	<Box sx={{ display: 'flex' }}>
		<Header />
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
			}}>
			{children}
		</Box>
	</Box>
);

export default MainAuthLayout;
