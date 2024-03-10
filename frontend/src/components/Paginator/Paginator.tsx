import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, IconButton } from '@mui/joy';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { toPositiveNumber } from '../../utils';
import { useSetPage } from '../../hooks/setPage';

type PaginatorProps = {
	setPage: (id: number) => void;
	pagesCount: number;
	currentPage: number;
};
const delta = 2;

export default function PaginatorContainer({ total, callback }: { total: number; callback: () => void }) {
	const { perPage } = useSelector((state: RootState) => state.paginator);
	const params = useParams();
	const setPage = useSetPage();

	const currentPage: number = toPositiveNumber(params.page);

	return (
		<Paginator
			currentPage={currentPage}
			pagesCount={Math.ceil(total / perPage)}
			setPage={(page: number) => {
				setPage(page);
				callback && callback();
			}}
		/>
	);
}

export function Paginator({ setPage, pagesCount, currentPage }: PaginatorProps) {
	let minPage = currentPage - delta;
	if (minPage < 1) {
		minPage = 1;
	}
	let maxPage = currentPage + delta;
	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1).slice(minPage - 1, maxPage);
	return (
		<Box
			sx={{
				p: 1,
				gap: 1,
				display: {
					xs: 'flex',
					md: 'flex',
				},
			}}>
			<IconButton
				sx={{ borderRadius: '50%' }}
				size='sm'
				variant='outlined'
				color='neutral'
				disabled={currentPage === 1 ? true : false}
				onClick={() => setPage(currentPage - 1)}>
				<KeyboardArrowLeftIcon />
			</IconButton>

			<Box sx={{ flex: 1 }} />
			{minPage > 1 ? (
				<>
					<IconButton
						sx={{ borderRadius: '50%' }}
						size='sm'
						variant='outlined'
						color='neutral'
						onClick={() => setPage(1)}>
						1
					</IconButton>
					_
				</>
			) : null}
			{pages.map((page) => (
				<IconButton
					key={page}
					sx={{ borderRadius: '50%' }}
					size='sm'
					variant='outlined'
					color='neutral'
					onClick={() => setPage(page)}
					disabled={page === currentPage ? true : false}>
					{page}
				</IconButton>
			))}
			{maxPage < pagesCount ? (
				<>
					_
					<IconButton
						sx={{ borderRadius: '50%' }}
						size='sm'
						variant='outlined'
						color='neutral'
						onClick={() => setPage(pagesCount)}>
						{pagesCount}
					</IconButton>
				</>
			) : null}
			<Box sx={{ flex: 1 }} />
			<IconButton
				sx={{ borderRadius: '50%' }}
				size='sm'
				variant='outlined'
				color='neutral'
				disabled={currentPage === pagesCount ? true : false}
				onClick={() => setPage(currentPage + 1)}>
				<KeyboardArrowRightIcon />
			</IconButton>
		</Box>
	);
}
