import { showMessage } from '../store/slices/messageSlice';
import { store } from '../store/store';
import { FetchError, ServerError } from '../types';

async function handleError({ error }: { error: ServerError | FetchError }) {
	console.log('ERROR: ', error);
	if ('error' in error) {
		//fetch error
		error?.error && store.dispatch(showMessage({ message: error.error, type: 'error' }));
	} else {
		//server error
		error?.data?.message && store.dispatch(showMessage({ message: error.data.message, type: 'error' }));
	}
}

const errorService = {
	handleError,
};

export default errorService;
