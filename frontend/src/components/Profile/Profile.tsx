import { IconButton, ListItem, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import api from '../../services/ApiService';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile() {
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
				<MenuItem>{profile?.name}</MenuItem>
				<MenuItem>{profile?.email}</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<LogoutIcon sx={{ color: 'text.primary' }} />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
