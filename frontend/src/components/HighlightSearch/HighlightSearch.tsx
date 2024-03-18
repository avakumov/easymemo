import { Box } from '@mui/joy';
import { ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { highlight } from '../../utils';

const timeout = import.meta.env.VITE_HIGHLIGHT_SEARCH_TIMEOUT ?? 1000;

const HighlightSearch = ({ children }: { children: ReactNode }) => {
	const { searchText } = useSelector((state: RootState) => state.search);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (ref.current === null) return;
			highlight(ref.current, searchText);
		}, timeout);
		return () => clearTimeout(timer);
	});

	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex' }} ref={ref}>
			{children}
		</Box>
	);
};

export default HighlightSearch;
