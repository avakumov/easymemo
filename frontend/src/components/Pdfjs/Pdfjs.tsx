import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/messageSlice';

const PdfjsLib = ({ callback }: { callback?: () => void }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Make sure it only gets included once.
			if (!document.getElementById('pdfjs')) {
				const script = document.createElement('script');
				script.id = 'pdfjs';
				script.type = 'text/javascript';
				script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.min.js`;

				// Call some function from the library when it loads.
				script.onload = function () {
					callback && callback();
				};
				script.onerror = function () {
					dispatch(showMessage({ type: 'error', message: 'Ошибка загрузка библиотеки pdfjs' }));
				};

				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
	}, [callback, dispatch]);

	return null;
};

export default PdfjsLib;
