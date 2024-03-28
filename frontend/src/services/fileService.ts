import { showMessage } from '../store/slices/messageSlice';
import { store } from '../store/store';
import { FetchError, FileType, ResponseSaveFileType, ServerError } from '../types';
import api from './ApiService';
import errorService from './errorService';

const endpoints = new Map([['pdf', api.endpoints.uploadPdfBook.initiate]]);

const fileService = {
	saveFile,
};

async function saveFile({ type, file }: { type: FileType; file: File | Blob }): Promise<{
	data: ResponseSaveFileType | null;
	error: ServerError | FetchError;
}> {
	const endpoint = endpoints.get(type);
	if (!endpoint) {
		console.error('endpoint not found');
		return { data: null, error: { error: 'endpoint not found', status: '' } };
	}
	if (!file) {
		return { data: null, error: { error: 'File not appended', status: '' } };
	}
	const form = new FormData();
	form.append('file', file);

	//@ts-ignore
	const { data, error } = await store.dispatch(endpoint(form));

	data && store.dispatch(showMessage({ message: 'Book saved', type: 'success' }));
	error && errorService.handleError({ error });
	return { data, error };
}

export default fileService;
