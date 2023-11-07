import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { IQuestion } from '../../types';
import api from '../../services/ApiService';
import { MenuItem, OutlinedInput, Select } from '@mui/material';

export default function FormQuestion({ data }: { data?: IQuestion }) {
	const [createQuestion, status] = api.useCreateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();

	const { handleSubmit, control } = useForm<IQuestion>({
		defaultValues: {
			question: data?.question ?? '',
			answer: data?.answer ?? '',
			categories: data?.categories ?? [],
			id: data?.id ?? undefined,
		},
	});

	const submit: SubmitHandler<IQuestion> = async (data) => {
		try {
			const question = await createQuestion(data).unwrap();
			console.log('answer: ', question);
		} catch (e) {
			console.error('ошибка запроса:', e);
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
										<MenuItem key={category.id} value={category.name}>
											{category.name}
										</MenuItem>
									))}
							</Select>
						)}
					/>
					<Grid container sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
						<Button variant='contained'>cancel</Button>
						<Button type='submit' variant='contained'>
							save
						</Button>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
