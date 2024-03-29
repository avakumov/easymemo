import * as React from 'react';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, SnackbarCloseReason } from '@mui/joy';
import { changeMessage } from '../../store/slices/messageSlice';

type MesssageType = {
	open: boolean;
	type: 'info' | 'warning' | 'success' | 'error' | undefined;
	message: string;
};

function getColor(type: MesssageType['type']): 'primary' | 'danger' | 'success' | 'warning' | 'neutral' {
	switch (type) {
		case 'error':
			return 'danger';
		case 'warning':
			return 'warning';
		case 'success':
			return 'success';
		case 'info':
			return 'neutral';
		default:
			return 'neutral';
	}
}

export default function Message() {
	const { open, message, type } = useSelector((state: RootState) => state.message);

	const dispatch = useDispatch();
	const handleClose = (event: React.SyntheticEvent<any, Event> | Event | null, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(changeMessage({ message: '', open: false }));
	};

	return (
		<Snackbar color={getColor(type)} variant='solid' open={open} autoHideDuration={6000} onClose={handleClose}>
			{message}
		</Snackbar>
	);
}
