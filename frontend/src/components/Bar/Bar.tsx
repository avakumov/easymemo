import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Profile from '../Profile/Profile';
import { useNavigate } from 'react-router-dom';

const pages = [
	{ name: 'Practice', path: '/practice' },
	{ name: 'Stats', path: '/stats' },
	{ name: 'Records', path: '/records' },
];

export default function Bar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleClickPage = (path: string) => () => {
		navigate(path, { replace: false });
		setAnchorElNav(null);
	};

	return (
		<AppBar position='static'>
			<Container sx={{ maxWidth: '100%', pl: '0px !important', pr: '0px !important' }} maxWidth={false}>
				<Toolbar variant='dense' sx={{ pl: '0px !important', pr: '0px !important' }}>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='small'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map((page) => (
								<MenuItem key={page.name} onClick={handleClickPage(page.path)}>
									<Typography textAlign='center'>{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.name}
								onClick={handleClickPage(page.path)}
								sx={{ display: 'block', color: 'inherit' }}>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Profile />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
