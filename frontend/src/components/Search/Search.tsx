import { Box, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { changeSearch } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SxProps } from '@mui/joy/styles/types';
import { highlight } from '../../utils';
import { resetPage } from '../../store/slices/paginatorSlice';

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
		const str = e.target.value;
		dispatch(changeSearch(str));
		//сбрасываем страницу на первую
		dispatch(resetPage());
		//выделяем найденное в тегe main
		highlight('main', str);
	}

	return (
		<Box
			sx={{
				maxWidth: {
					xs: '200px',
					sm: 'inherit',
				},
				...sx,
			}}>
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
