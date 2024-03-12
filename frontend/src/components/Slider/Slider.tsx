// Default theme
import '@splidejs/react-splide/css';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Splider = () => {
	const filter = useSelector((state: RootState) => state.filters.questions.filter);
	const { data } = api.useGetQuestionsQuery({ filter });

	const theme = useTheme();
	let isMobile = useMedia(`(max-width: ${theme.breakpoints.values.md}px)`);
	const width = isMobile ? '100vw' : 'calc(100vw - var(--Sidebar-width))';

	if (data?.questions.length === 0) {
		return <Box sx={{ fontSize: '2rem' }}>Слайдов нет!</Box>;
	}
	return (
		<Splide
			options={{
				rewind: true,
				gap: '1rem',
				perPage: 1,
				type: 'loop',
				pagination: false,
				arrows: isMobile ? false : true,
				width: width,
				wheel: true,
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
							p: isMobile ? '1rem' : '4rem',
							alignItems: 'start',
						}}>
						<Box
							sx={{
								position: 'absolute',
								right: '1rem',
								top: '1rem',
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
							<QuestionMenu questionId={question.id} />
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
										color='primary'
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
						<Box sx={{ display: 'flex', gap: 1, fontStyle: 'italic' }}>
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
