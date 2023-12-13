import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { EntityNames, ICategory, ICategoryForm } from '../../types';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/reducers/messageActions';

export default function FormCategory({ data, exit }: { exit: () => void; data?: ICategory }) {
	const [createCategory] = api.useCreateCategoryMutation();
	const [updateCategory] = api.useUpdateCategoryMutation();
	const dispatch = useDispatch();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICategory>({
		defaultValues: {
			name: data?.name ?? '',
			id: data?.id ?? undefined,
		},
		mode: 'onChange',
	});

	const submit: SubmitHandler<ICategoryForm> = async (category) => {
		try {
			const operation = category.id ? updateCategory : createCategory;
			const c = await operation(category).unwrap();
			//show success message
			c.id && dispatch(showMessage({ message: 'Category saved', type: 'success' }));

			//update table entities
			dispatch(api.util.invalidateTags([EntityNames.CATEGORY]));
		} catch (e) {
			console.error('ошибка:', e);
			dispatch(showMessage({ message: JSON.stringify(e), type: 'error' }));
		}
		exit();
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
					{data?.id ? 'Change' : 'New'} category
				</Typography>
				<Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submit)}>
					<Controller
						name='name'
						control={control}
						rules={{
							maxLength: 50,
							//категория не должна содержать пробелы
							validate: (value, formValues) => !/\s/.test(value),
						}}
						render={({ field }) => (
							<TextField
								error={!!errors.name}
								margin='normal'
								fullWidth
								label='Category'
								autoFocus
								helperText={errors.name ? 'without spaces' : ''}
								{...field}
							/>
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
