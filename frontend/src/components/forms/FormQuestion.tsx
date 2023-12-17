import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { EntityNames, IQuestion } from '../../types';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/reducers/messageActions';
import { Box, Button, FormControl, FormLabel, Option, Select, Textarea, Typography } from '@mui/joy';

export default function FormQuestion({ data, exit }: { exit: () => void; data?: IQuestion }) {
	const [createQuestion] = api.useCreateQuestionMutation();
	const [updateQuestion] = api.useUpdateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();
	const dispatch = useDispatch();

	const { handleSubmit, control, setValue } = useForm<Partial<IQuestion>>({
		defaultValues: {
			question: data?.question ?? '',
			answer: data?.answer ?? '',
			categories: Array.isArray(data?.categories) ? data.categories.map((c) => c.id) : [],
			id: data?.id ?? undefined,
		},
	});

	const submit: SubmitHandler<Partial<IQuestion>> = async (q) => {
		try {
			const operation = q.id ? updateQuestion : createQuestion;
			const question = await operation(q).unwrap();
			//show success message
			question.id && dispatch(showMessage({ message: 'Quesiton saved', type: 'success' }));

			//update table entities
			dispatch(api.util.invalidateTags([EntityNames.QUESTION]));
		} catch (e) {
			console.error('ошибка:', e);
			dispatch(showMessage({ message: JSON.stringify(e), type: 'error' }));
		}
		exit();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minWidth: '400px',
			}}>
			<Typography component='h1'>{data?.id ? 'Change' : 'New'} question</Typography>
			<Box
				component='form'
				noValidate
				sx={{ mt: 1, display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}
				onSubmit={handleSubmit(submit)}>
				<Controller
					name='question'
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormLabel>Question</FormLabel>
							<Textarea variant='soft' placeholder='question...' {...field} />
						</FormControl>
					)}
				/>
				<Controller
					name='answer'
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormLabel>Answer</FormLabel>
							<Textarea variant='soft' placeholder='answer is ...' {...field} />
						</FormControl>
					)}
				/>

				<Controller
					name='categories'
					control={control}
					render={({ field }) => (
						<Select
							multiple
							{...field}
							onChange={(_, newValue) => {
								setValue('categories', newValue);
							}}>
							{Array.isArray(categories) &&
								categories.map((category) => (
									<Option key={category.id} value={category.id}>
										{category.name}
									</Option>
								))}
						</Select>
					)}
				/>
				<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
					<Button variant='soft' onClick={exit}>
						cancel
					</Button>
					<Button type='submit' variant='soft'>
						save
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
