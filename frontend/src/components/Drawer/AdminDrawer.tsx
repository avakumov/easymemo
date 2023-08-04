import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import TableRowsIcon from '@mui/icons-material/TableRows';

const drawerWidth = 240;

const entities = [
	{ name: 'Users', path: '?show=users', icon: <GroupIcon sx={{ color: 'text.primary' }} /> },
	{
		name: 'Questions',
		path: '?show=questions',
		icon: <QuestionMarkIcon sx={{ color: 'text.primary' }} />,
	},
	{ name: 'Categories', path: '?show=categories', icon: <CategoryIcon sx={{ color: 'text.primary' }} /> },
];

export default function AdminDrawer() {
	const navigate = useNavigate();
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant='permanent'
			anchor='left'>
			<List>
				{entities.map((item, _index) => (
					<ListItem key={item.name} disablePadding>
						<ListItemButton dense onClick={() => navigate(item.path, { replace: false })}>
							<ListItemIcon>
								{item.icon ? item.icon : <TableRowsIcon sx={{ color: 'text.primary' }} />}
							</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
