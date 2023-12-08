import { Box, IconButton, ListItem, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { ReactNode, useState } from 'react';
import api from '../../services/ApiService';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { token } from '../../services/auth';
import { useDispatch } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

const themeValues = ['light', 'dark', 'system'];

const themeIcons = new Map<string, ReactNode>([
	['light', <Brightness4Icon />],
	['dark', <Brightness7Icon />],
	['system', <SettingsSystemDaydreamIcon />],
]);

function getIcon(themeName: string = 'system'): ReactNode {
	return themeIcons.get(themeName);
}

export default function Profile() {
	const dispatch = useDispatch();

	const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
	const [getProfile, { data: profile }] = api.endpoints.getProfile.useLazyQuery();
	const [changeTheme] = api.useChangeThemeMutation();
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
					onClick={async () => {
						if (!profile?.id) return;

						const indexTheme = themeValues.findIndex((themeName) => themeName === profile?.themeInterface);
						let nextIndex = indexTheme + 1;
						const len = themeValues.length;
						if (nextIndex >= len) {
							nextIndex = 0;
						}

						await changeTheme({
							id: profile.id,
							themeInterface: themeValues[nextIndex],
						});
						dispatch(api.util.invalidateTags(['profile']));
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}>
						{profile?.themeInterface} theme
						<IconButton color='inherit'>{getIcon(profile?.themeInterface)}</IconButton>
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
