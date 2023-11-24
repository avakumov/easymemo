import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeMessage } from '../../store/reducers/messageActions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Message() {
	const { open, message, type } = useSelector((state: RootState) => state.message);

	const dispatch = useDispatch();
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(changeMessage({ message: '', open: false }));
	};

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
