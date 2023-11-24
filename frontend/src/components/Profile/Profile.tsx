import { Box, IconButton, ListItem, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import api from '../../services/ApiService';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { token } from '../../services/auth';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/reducers/themeActions';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Profile() {
	const themeName = useSelector((state: RootState) => state.theme.name);
	const dispatch = useDispatch();

	const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
	const [getProfile, { data: profile }] = api.endpoints.getProfile.useLazyQuery();
	const isOpenProfile = Boolean(anchorProfile);

	function openProfile(e: React.MouseEvent<HTMLButtonElement>) {
		setAnchorProfile(e.currentTarget);
		getProfile();
	}

	function closeProfile() {
		setAnchorProfile(null);
	}

	return (
		<>
			<IconButton sx={{ color: 'text.primary' }} size='small' onClick={openProfile}>
				<AccountBoxIcon />
			</IconButton>
			<Menu open={isOpenProfile} anchorEl={anchorProfile} onClose={closeProfile}>
				<ListItem>{profile?.isAdmin ? 'Admin' : 'User'}</ListItem>
				<ListItem>{profile?.name}</ListItem>
				<ListItem>{profile?.email}</ListItem>
				<MenuItem
					onClick={() => {
						dispatch(changeTheme({ name: themeName === 'dark' ? 'light' : 'dark' }));
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						{themeName} mode
						<IconButton color='inherit'>
							{themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Box>
				</MenuItem>
				<MenuItem
					onClick={() => {
						token.removeToken();
						window.location.reload();
					}}>
					<ListItemIcon>
						<LogoutIcon sx={{ color: 'text.primary' }} />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
