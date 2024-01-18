import { Box, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { changeSearch } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SxProps } from '@mui/joy/styles/types';
import { highlight } from '../../utils';

const Search = ({ sx }: { sx?: SxProps }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);
	const searchText = useSelector((state: RootState) => state.search.commonTextSearch);

	useEffect(() => {
		if (isOpen && searchRef.current !== null) {
			searchRef.current.focus();
		} else {
			dispatch(changeSearch(''));
		}
	}, [dispatch, isOpen]);

	function clickSearch() {
		setIsOpen(!isOpen);
	}

	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		const text = e.target.value;
		dispatch(changeSearch(text));
		highlight(document.body, [text]);
	}

	return (
		<Box sx={sx}>
			<Input
				onChange={changeInput}
				value={searchText}
				size='sm'
				sx={{ display: isOpen ? 'flex' : 'none' }}
				slotProps={{ input: { ref: searchRef, spellCheck: false } }}
			/>
			<IconButton onClick={clickSearch}>
				<SearchIcon />
			</IconButton>
		</Box>
	);
};

export default Search;
