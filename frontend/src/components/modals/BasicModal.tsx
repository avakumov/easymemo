import { Modal, Sheet } from '@mui/joy';
import { ReactNode, MouseEvent } from 'react';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	p: 2,
	borderRadius: 'md',
	boxShadow: 'lg',
};

type BasicModalProps = {
	isOpen: boolean;
	close: (e: MouseEvent<HTMLElement>) => void;
	children: ReactNode;
};

export default function BasicModal({ isOpen, close, children }: BasicModalProps) {
	return (
		<Modal open={isOpen} onClose={close}>
			<Sheet sx={style}>{children}</Sheet>
		</Modal>
	);
}
