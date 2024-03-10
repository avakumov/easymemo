import { useNavigate } from 'react-router-dom';

export const useSetPage = () => {
	//TODO дополнить проверкой что в URL есть параметр page
	const navigate = useNavigate();
	return function setPage(page: number) {
		navigate('../' + page, { relative: 'path' });
	};
};
