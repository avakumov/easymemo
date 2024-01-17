import { Box, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { changeSearch } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && searchRef.current !== null) {
			searchRef.current.focus();
		}
	}, [isOpen]);

	const searchText = useSelector((state: RootState) => state.search.commonTextSearch);

	function clickSearch() {
		setIsOpen(!isOpen);
	}

	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.target.value);
		dispatch(changeSearch(e.target.value));
	}

	return (
		<Box sx={{ display: 'flex', gap: 1 }}>
			<IconButton onClick={clickSearch}>
				<SearchIcon />
			</IconButton>
			<Input
				onChange={changeInput}
				value={searchText}
				size='sm'
				sx={{ display: isOpen ? 'flex' : 'none' }}
				slotProps={{ input: { ref: searchRef, spellCheck: false } }}
			/>
		</Box>
	);
};

export default Search;
