import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
	type: 'error' | 'warning' | 'info' | 'success';
	message: string;
};
export default function BasicAlert({ type, message }: AlertProps) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity={type}>{message}</Alert>
		</Stack>
	);
}
