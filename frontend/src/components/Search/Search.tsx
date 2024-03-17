import { Box, IconButton, Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { memo, useEffect, useRef, useState } from 'react';
import { changeInputSearch } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { SxProps } from '@mui/joy/styles/types';
import ClearIcon from '@mui/icons-material/Clear';
import { useSetPage } from '../../hooks/setPage';

const Search = ({ sx }: { sx?: SxProps }) => {
	const dispatch = useDispatch();
	const setPage = useSetPage();
	const searchRef = useRef<HTMLInputElement>(null);
	const [showInput, setShowInput] = useState(false);
	const { searchText } = useSelector((state: RootState) => state.search);

	useEffect(() => {
		if (showInput && searchRef.current !== null) {
			searchRef.current.focus();
		} else {
			//отключить поиск
			dispatch(changeInputSearch(''));
		}
	}, [dispatch, showInput]);

	function clickSearch() {
		setShowInput((prev) => !prev);
	}

	function setInput(text: string) {
		dispatch(changeInputSearch(text));
		//сбрасываем страницу на первую если она есть
		setPage(1);
	}
	function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
		const str = e.target.value;
		setInput(str);
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
				endDecorator={
					<IconButton onClick={() => setInput('')} sx={{ visibility: showInput ? 'visible' : 'hidden' }}>
						<ClearIcon />
					</IconButton>
				}
				onChange={changeInput}
				value={searchText}
				size='sm'
				sx={{ display: showInput ? 'flex' : 'none' }}
				slotProps={{ input: { ref: searchRef, spellCheck: false } }}
			/>
			<IconButton onClick={clickSearch}>
				<SearchIcon />
			</IconButton>
		</Box>
	);
};

export default memo(Search);
