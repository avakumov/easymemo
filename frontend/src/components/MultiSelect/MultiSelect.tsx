import { useState } from 'react';
import { Button, ListItemButton, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type MultiSelectType = {
	items: string[];
	selectedItems: string[];
	onSelect: (name: string) => void;
	selectAll: () => void;
	unSelectAll: () => void;
	name: string;
};

export default function MultiSelect({ name, items, selectedItems, onSelect, selectAll, unSelectAll }: MultiSelectType) {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchor);
	const isAllSelected = items.length === selectedItems.length;

	function open(e: React.MouseEvent<HTMLButtonElement>) {
		setAnchor(e.currentTarget);
	}

	function close() {
		setAnchor(null);
	}

	function selectAllClick() {
		isAllSelected ? unSelectAll() : selectAll();
	}

	return (
		<>
			<Button
				sx={{ color: 'text.primary', fontWeight: 'bold' }}
				size='small'
				onClick={open}
				title={selectedItems.join(', ')}
				endIcon={<KeyboardArrowDownIcon />}>
				{name}
			</Button>
			<Menu open={isOpen} anchorEl={anchor} onClose={close}>
				<ListItemButton selected={false} onClick={selectAllClick}>
					{isAllSelected ? 'unselect all' : 'select all'}
				</ListItemButton>
				{Array.isArray(items) &&
					items.map((name) => (
						<ListItemButton
							onClick={() => onSelect(name)}
							selected={selectedItems.some((i) => i === name)}
							key={name}>
							{name}
						</ListItemButton>
					))}
			</Menu>
		</>
	);
}
