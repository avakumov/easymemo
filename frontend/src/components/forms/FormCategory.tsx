import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { EntityNames, ICategory, IQuestionForm } from '../../types';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/reducers/messageActions';

export default function FormCategory({ data, close }: { close: () => void; data?: ICategory }) {
	const [createQuestion] = api.useCreateQuestionMutation();
	const [updateQuestion] = api.useUpdateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();
	const dispatch = useDispatch();

	const { handleSubmit, control } = useForm<ICategory>({
		defaultValues: {
			name: data?.name ?? '',
			id: data?.id ?? undefined,
		},
	});

	const submit: SubmitHandler<IQuestionForm> = async (q) => {
		try {
			const operation = q.id ? updateQuestion : createQuestion;
			const question = await operation(q).unwrap();
			//show success message
			question.id && dispatch(showMessage({ message: 'Quesiton saved', type: 'success' }));

			exit();
			//update table entities
			dispatch(api.util.invalidateTags([EntityNames.QUESTION]));
		} catch (e) {
			console.error('ошибка соединения:', e);
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
					New question
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
							<Select multiple input={<OutlinedInput label='Name' />} {...field}>
								{Array.isArray(categories) &&
									categories.map((category) => (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									))}
							</Select>
						)}
					/>
					<Grid container sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
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
