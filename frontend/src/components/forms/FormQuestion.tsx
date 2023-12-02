import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { EntityNames, IQuestion, IQuestionForm } from '../../types';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/reducers/messageActions';

export default function FormQuestion({ data, exit }: { exit: () => void; data?: IQuestion }) {
	const [createQuestion] = api.useCreateQuestionMutation();
	const [updateQuestion] = api.useUpdateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();
	const dispatch = useDispatch();

	const { handleSubmit, control } = useForm<Partial<IQuestion>>({
		defaultValues: {
			question: data?.question ?? '',
			answer: data?.answer ?? '',
			categories: Array.isArray(data?.categories) ? data?.categories : [],
			id: data?.id ?? undefined,
		},
	});

	const submit: SubmitHandler<Partial<IQuestion>> = async (q) => {
		try {
			const operation = q.id ? updateQuestion : createQuestion;
			const question = await operation(q).unwrap();
			//show success message
			question.id && dispatch(showMessage({ message: 'Quesiton saved', type: 'success' }));

			exit();
			//update table entities
			dispatch(api.util.invalidateTags([EntityNames.QUESTION]));
		} catch (e) {
			if (e instanceof Error) {
				console.error('ошибка соединения:', e);
				dispatch(showMessage({ message: e.message, type: 'error' }));
			}
		}
	};
	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h5'>
					{data?.id ? 'Change' : 'New'} question
				</Typography>
				<Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submit)}>
					<Controller
						name='question'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								fullWidth
								label='Question'
								autoFocus
								multiline={true}
								{...field}
							/>
						)}
					/>
					<Controller
						name='answer'
						control={control}
						render={({ field }) => (
							<TextField margin='normal' fullWidth label='Answer' multiline={true} {...field} />
						)}
					/>

					<Controller
						name='categories'
						control={control}
						render={({ field }) => (
							<Select multiple input={<OutlinedInput label='Name' />} sx={{ mt: 2, mb: 1 }} {...field}>
								{Array.isArray(categories) &&
									categories.map((category) => (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									))}
							</Select>
						)}
					/>
					<Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
						<Button variant='contained' onClick={exit}>
							cancel
						</Button>
						<Button type='submit' variant='contained'>
							save
						</Button>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
