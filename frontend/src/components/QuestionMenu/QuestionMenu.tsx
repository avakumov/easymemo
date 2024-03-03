import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Divider } from '@mui/joy';
import { showMessage } from '../../store/slices/messageSlice';
import api from '../../services/ApiService';
import { EntityNames } from '../../types';
import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';

function QuestionMenu({ questionId }: { questionId: number }) {
	const dispatch = useAppDispatch();
	const [removeEntity] = api.useRemoveEntityMutation();
	const [getQuestion] = api.endpoints.getQuestion.useLazyQuery();

	async function removeElement(id: number) {
		try {
			const removedQuestion = await removeEntity({ entityName: EntityNames.QUESTION, id }).unwrap();

			if (removedQuestion.id) {
				removedQuestion.id && dispatch(showMessage({ message: 'Quesiton removed', type: 'success' }));
				dispatch(api.util.invalidateTags([EntityNames.QUESTION]));
			} else {
				dispatch(showMessage({ type: 'info', message: 'Что-то пошло не так' }));
			}
		} catch (e: any) {
			console.log(e);
			dispatch(showMessage({ type: 'error', message: e?.data?.message ?? 'Error on remove' }));
		}
	}

	const editElement = async (id: number) => {
		const question = await getQuestion(id).unwrap();
		dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: question, open: true }));
	};

	const removeElementCallback = useCallback(removeElement, [dispatch, removeEntity]);

	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
				<MoreHorizRoundedIcon />
			</MenuButton>
			<Menu size='sm'>
				<MenuItem>
					<IconButton onClick={() => editElement(questionId)}>
						<EditIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
				<Divider />
				<MenuItem color='danger'>
					<IconButton onClick={() => removeElementCallback(questionId)}>
						<DeleteOutlineIcon fontSize='inherit' />
					</IconButton>
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}

export default QuestionMenu;
