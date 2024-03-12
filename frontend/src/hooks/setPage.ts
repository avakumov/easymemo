import { useNavigate } from 'react-router-dom';

export const useSetPage = () => {
	const navigate = useNavigate();
	return function setPage(page: number) {
		const currentPage = window.location.pathname.split('/').pop();
		const numberPage = Number(currentPage);
		const isInteger = Number.isInteger(numberPage);

		//в url нет номера страницы
		if (!isInteger) {
			return;
		}

		if (currentPage === String(page)) {
			return;
		}

		navigate('../' + page, { relative: 'path' });
	};
};
