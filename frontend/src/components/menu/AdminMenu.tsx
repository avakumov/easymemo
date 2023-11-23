import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { EntityNames } from '../../types';

const entities = [
	{
		name: EntityNames.USER,
		path: `?show=${EntityNames.USER}`,
		icon: <GroupIcon sx={{ color: 'text.primary' }} />,
	},
	{
		name: EntityNames.QUESTION,
		path: `?show=${EntityNames.QUESTION}`,
		icon: <QuestionMarkIcon sx={{ color: 'text.primary' }} />,
	},
	{
		name: EntityNames.CATEGORY,
		path: `?show=${EntityNames.CATEGORY}`,
		icon: <CategoryIcon sx={{ color: 'text.primary' }} />,
	},
];

export default function AdminMenu() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const name = params.get('show');

	return (
		<List>
			{entities.map((item, _index) => (
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
