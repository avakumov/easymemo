import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Divider } from '@mui/joy';

type QuestionMenuProps = {
	removeItem: () => void;
	editItem: () => void;
};

function QuestionMenu({ removeItem, editItem }: QuestionMenuProps) {
	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
				<MoreHorizRoundedIcon />
			</MenuButton>
			<Menu size='sm'>
				<MenuItem>
					<IconButton onClick={editItem}>
						<EditIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
				<Divider />
				<MenuItem color='danger'>
					<IconButton onClick={removeItem}>
						<DeleteOutlineIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}

export default QuestionMenu;
