import { ReactNode } from 'react';
import api from '../../services/ApiService';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { token } from '../../services/auth';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import { Dropdown, IconButton, ListDivider, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';

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
	const { data: profile } = api.useGetProfileQuery();

	return (
		<Dropdown>
			<MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'soft' } }}>
				<AccountBoxIcon />
			</MenuButton>
			<Menu size='sm' style={{ zIndex: 10000 }}>
				<MenuItem disabled>{profile?.isAdmin ? 'Admin' : 'User'}</MenuItem>
				<MenuItem disabled>{profile?.name}</MenuItem>
				<MenuItem disabled>{profile?.email}</MenuItem>
				<MenuItem>
					<ColorSchemeToggle />
					<Typography>theme</Typography>
				</MenuItem>
				<ListDivider />
				<MenuItem
					onClick={() => {
						token.removeToken();
						window.location.reload();
					}}>
					<LogoutIcon />
					Logout
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}
