import { MessageTypes, showMessage } from './slices/messageSlice';
import { store } from './store';

export const service = {
	showMessage: (message: string, type: MessageTypes) => {
		store.dispatch(showMessage({ message, type }));
	},
};
