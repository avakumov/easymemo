import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TableRowsIcon from '@mui/icons-material/TableRows';
import api from '../../services/ApiService';
import { extendEntities } from '../../utils';

export default function Menu() {
	const { data: profile, error, isLoading } = api.useGetProfileQuery();
	const preparedEntities = extendEntities(profile?.entities);

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const name = params.get('show');
	function onClick(path: string) {
		navigate(path, { replace: false });
	}

	return <MenuSimple list={preparedEntities} onClick={onClick} name={name} />;
}

export function MenuSimple({
	list,
	onClick,
	name,
}: {
	name: string | null;
	list: { icon: React.ReactNode; name: string; path: string }[];
	onClick: (path: string) => void;
}) {
	return (
		<List>
			{list.map((item, _index) => (
				<ListItem key={item.name} sx={{ px: '5px', py: 0 }}>
					<ListItemButton
						sx={{ borderRadius: '5px' }}
						dense
						onClick={() => onClick(item.path)}
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
