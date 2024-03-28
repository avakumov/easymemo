import { Box } from '@mui/joy';
import api from '../../services/ApiService';
import BookCard from '../BookCard/BookCard';
import Loading from '../Loading/Loading';

const Books = () => {
	const { data: books, error, isLoading } = api.useGetBooksQuery();
	if (isLoading) return <Loading />;
	if (error) return <p>ERROR</p>;
	if (!books || books.length === 0) return <p>Книг нет</p>;
	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: '100%' }}>
			{books.map((book) => (
				<BookCard key={book.id} book={book} />
			))}
		</Box>
	);
};
export default Books;
