import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { IconButton } from '@mui/joy';
import { useState, useEffect } from 'react';

export default function ScrollButton() {
	const [isBottom, setIsBottom] = useState(false);

	function handleScroll() {
		setIsBottom(window.pageYOffset + window.innerHeight >= document.body.scrollHeight);
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			{isBottom ? (
				<IconButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<KeyboardDoubleArrowUpIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
					<KeyboardDoubleArrowDownIcon />
				</IconButton>
			)}
		</>
	);
}
