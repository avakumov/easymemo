import React, { useCallback } from 'react';
// Default theme
// import '@splidejs/react-splide/css';
// or other themes
//import '@splidejs/react-splide/css/skyblue';
//import '@splidejs/react-splide/css/sea-green';
// or only core styles
import '@splidejs/react-splide/css/core';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Box, Link, Sheet, Typography, useTheme } from '@mui/joy';
import { useMedia } from 'react-use';
import api from '../../services/ApiService';

import LinkIcon from '@mui/icons-material/Link';
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../store/slices/messageSlice';
import { EntityNames, IQuestion } from '../../types';
import { entityModalOpen } from '../../store/slices/FormEntityModalSlice';
import { RootState } from '../../store/store';

const Splider = () => {
	const filter = useSelector((state: RootState) => state.filters.questions.filter);
	const { data, error, isLoading } = api.useGetQuestionsQuery({ filter });

	const dispatch = useDispatch();

	const editElement = useCallback(
		(question: IQuestion) => {
			debugger;
			dispatch(entityModalOpen({ name: EntityNames.QUESTION, data: question, open: true }));
		},
		[dispatch]
	);
	const [removeEntity] = api.useRemoveEntityMutation();
	const removeElementCallback = useCallback(removeElement, [dispatch, removeEntity]);

	const theme = useTheme();
	let isMobile = useMedia(`(max-width: ${theme.breakpoints.values.md}px)`);
	const width = isMobile ? '100vw' : 'calc(100vw - var(--Sidebar-width))';

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
	return (
		<Splide
			options={{
				rewind: true,
				gap: '1rem',
				perPage: 1,
				type: 'loop',
				pagination: false,
				arrows: false,
				width: width,

				height: 'calc(100vh - var(--Header-height))',
			}}>
			{data?.questions.map((question, index) => (
				<SplideSlide key={index}>
					<Box
						key={question.id}
						sx={{
							display: 'flex',
							justifyContent: 'start',
							flexDirection: 'column',
							height: '100%',
							fontSize: '1.5rem',
							p: 2,
							alignItems: 'start',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}>
							{question.url ? (
								<Link href={question.url} target='_blank' title={question.url}>
									<LinkIcon />
								</Link>
							) : (
								<Box></Box>
							)}
							<QuestionMenu
								removeItem={() => removeElementCallback(question.id)}
								editItem={() => editElement(question)}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								height: '100%',
								width: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Typography sx={{ mb: 1, fontSize: '1.5rem' }}>{question.question}</Typography>

							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}>
								{question.rightAnswers.split(' |-| ').map((a) => (
									<Sheet
										key={a}
										variant='soft'
										sx={{
											p: '0.5rem',
											typography: {
												fontSize: '1.5rem',
											},
											borderRadius: '0.3rem',
											overflowWrap: 'anywhere',
										}}>
										{a}
									</Sheet>
								))}
							</Box>
						</Box>
						<Box sx={{ display: 'flex', gap: 1 }}>
							{question.categories.map((category) => (
								<Typography key={category.id} level='body-lg'>
									{category.name}
								</Typography>
							))}
						</Box>
					</Box>
				</SplideSlide>
			))}
		</Splide>
	);
};

export default Splider;
