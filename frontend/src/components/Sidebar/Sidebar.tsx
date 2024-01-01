import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import Profile from '../Profile/Profile';
import { closeSidebar } from '../../utils';

const menuItems = [
	{
		title: 'Practice',
		path: '/practice',
		icon: <KeyboardIcon />,
		items: [
			{ title: '10 questions', path: '/practice?count=10', icon: null },
			{ title: '50 questions', path: '/practice?count=50', icon: null },
			{ title: 'Error work', path: '/practice', icon: null },
		],
	},
	{
		title: 'Records',
		path: '/records',
		icon: <ViewListIcon />,
		items: [
			{ title: 'Questions', path: '/records?show=questions', icon: <QuestionMarkIcon /> },
			{ title: 'Categories', path: '/records?show=categories', icon: <CategoryIcon /> },
			{ title: 'Users', path: '/records?show=users', icon: <GroupIcon /> },
		],
	},
	{ title: 'Stats', path: '/stats', icon: <AutoGraphIcon /> },
];

function Toggler({
	defaultExpanded = false,
	renderToggle,
	children,
}: {
	defaultExpanded?: boolean;
	children: React.ReactNode;
	renderToggle: (params: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}) {
	const [open, setOpen] = React.useState(defaultExpanded);
	return (
		<React.Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				sx={{
					display: 'grid',
					gridTemplateRows: open ? '1fr' : '0fr',
					transition: '0.2s ease',
					'& > *': {
						overflow: 'hidden',
					},
				}}>
				{children}
			</Box>
		</React.Fragment>
	);
}

export default function Sidebar() {
	const { pathname, search } = window.location;
	const currentPath = pathname + search;
	const navigate = useNavigate();
	const handleClickPage = (path: string) => {
		const currentPath = window.location.pathname;
		if (currentPath === path) return;
		navigate(path, { replace: false });
	};

	return (
		<Sheet
			className='Sidebar'
			variant='plain'
			sx={{
				position: { xs: 'fixed', md: 'sticky' },
				transform: {
					xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
					md: 'none',
				},
				transition: 'transform 0.4s, width 0.4s',
				zIndex: 10000,
				height: '100dvh',
				width: 'var(--Sidebar-width)',
				top: 0,
				p: 2,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				borderRight: '1px solid',
				borderColor: 'divider',
			}}>
			<GlobalStyles
				styles={(theme) => ({
					':root': {
						'--Sidebar-width': '220px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '240px',
						},
					},
				})}
			/>
			<Box
				className='Sidebar-overlay'
				sx={{
					position: 'fixed',
					zIndex: 9998,
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					opacity: 'var(--SideNavigation-slideIn)',
					backgroundColor: 'var(--joy-palette-background-backdrop)',
					transition: 'opacity 0.4s',
					transform: {
						xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
						lg: 'translateX(-100%)',
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography level='title-lg'>Easymemo</Typography>
				<Profile />
			</Box>
			<Box
				sx={{
					minHeight: 0,
					overflow: 'hidden auto',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}>
				<List
					size='sm'
					sx={{
						'--List-nestedInsetStart': '15px',
						'--ListItem-radius': (theme) => theme.vars.radius.sm,
						gap: 1,
					}}>
					{menuItems.map((p) => {
						if (Array.isArray(p.items)) {
							return (
								<ListItem key={p.title} nested>
									<Toggler
										renderToggle={({ open, setOpen }) => (
											<ListItemButton
												onClick={() => {
													setOpen(!open);
													handleClickPage(p.path);
												}}
												selected={currentPath === p.path}>
												{p.icon}
												<ListItemContent>
													<Typography level='title-sm'>{p.title}</Typography>
												</ListItemContent>
												<KeyboardArrowDownIcon
													sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
												/>
											</ListItemButton>
										)}>
										<List>
											{p.items.map((i) => (
												<ListItem key={i.title}>
													<ListItemButton
														selected={currentPath === i.path}
														onClick={() => {
															handleClickPage(i.path);
														}}>
														{i.icon}
														{i.title}
													</ListItemButton>
												</ListItem>
											))}
										</List>
									</Toggler>
								</ListItem>
							);
						} else {
							return (
								<ListItem key={p.title}>
									<ListItemButton
										onClick={() => {
											handleClickPage(p.path);
										}}
										selected={pathname === p.path}>
										{p.icon}
										<ListItemContent>
											<Typography level='title-sm'>{p.title}</Typography>
										</ListItemContent>
									</ListItemButton>
								</ListItem>
							);
						}
					})}
				</List>
			</Box>
		</Sheet>
	);
}
