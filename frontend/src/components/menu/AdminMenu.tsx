import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TableRowsIcon from '@mui/icons-material/TableRows';
import api from '../../services/ApiService';
import { extendEntities } from '../../utils';

export default function AdminMenu() {
	const { data: profile, error, isLoading } = api.useGetProfileQuery();
	const preparedEntities = extendEntities(profile?.entities);

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const name = params.get('show');

	return (
		<List>
			{preparedEntities.map((item, _index) => (
				<ListItem key={item.name} disablePadding>
					<ListItemButton
						dense
						onClick={() => navigate(item.path, { replace: false })}
						selected={name === item.name}>
						<ListItemIcon>
							{item.icon ? item.icon : <TableRowsIcon sx={{ color: 'text.primary' }} />}
						</ListItemIcon>
						<ListItemText primary={item.name} sx={{ textTransform: 'uppercase' }} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
