import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ReactNode, MouseEvent } from 'react';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	bgcolor: 'background.paper',
	border: '1px solid #AAA',
	boxShadow: 24,
	p: 4,
};

type BasicModalProps = {
	isOpen: boolean;
	close: (e: MouseEvent<HTMLElement>) => void;
	// element: React.ReactNode;
	children: ReactNode;
};

export default function BasicModal({ isOpen, close, children }: BasicModalProps) {
	return (
		<Modal
			open={isOpen}
			onClose={close}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box sx={style}>{children}</Box>
		</Modal>
	);
}
