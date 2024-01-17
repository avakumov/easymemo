import { Box } from '@mui/joy';
import { ReactNode } from 'react';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const MainAuthLayout = ({ children }: { children: ReactNode }) => (
	<Auth>
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
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
				{children}
			</Box>
		</Box>
	</Auth>
);

export default MainAuthLayout;
