import { Box, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { changeSearch } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SxProps } from '@mui/joy/styles/types';

const Search = ({ sx }: { sx: SxProps }) => {
const Search = ({ sx }: { sx?: SxProps }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && searchRef.current !== null) {
			searchRef.current.focus();
		} else {
			dispatch(changeSearch(''));
		}
	}, [dispatch, isOpen]);

	const searchText = useSelector((state: RootState) => state.search.commonTextSearch);

	function clickSearch() {
		setIsOpen(!isOpen);
	}

	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(changeSearch(e.target.value));
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
