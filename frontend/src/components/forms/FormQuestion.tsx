import { SubmitHandler, useForm, Controller, useFieldArray } from 'react-hook-form';
import { EntityNames, IQuestion, IQuestionForm } from '../../types';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, IconButton, Option, Select, Textarea, Typography } from '@mui/joy';
import { showMessage } from '../../store/slices/messageSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function FormQuestion({ data, exit }: { exit: () => void; data?: IQuestion }) {
	const [createQuestion] = api.useCreateQuestionMutation();
	const [updateQuestion] = api.useUpdateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();
	const dispatch = useDispatch();

	const { handleSubmit, control, setValue, watch } = useForm<IQuestionForm>({
		defaultValues: {
			id: data?.id ?? undefined,
			question: data?.question ?? '',
			categories: Array.isArray(data?.categories) ? data?.categories.map((c) => c.id) : [],
			correctAnswers: Array.isArray(data?.correctAnswers) ? data?.correctAnswers.map((a) => a) : [' '],
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: 'correctAnswers' as never,
		control,
		rules: {
			required: 'Please append at least 1 item',
		},
	});
	watch();

	const submit: SubmitHandler<IQuestionForm> = async (q) => {
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
			}}>
			<Typography component='h1'>{data?.id ? 'Change' : 'New'} question</Typography>
			<Box
				component='form'
				noValidate={false}
				sx={{ mt: 1, display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}
				onSubmit={handleSubmit(submit)}>
				<Controller
					name='question'
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormLabel>Question</FormLabel>
							<Textarea
								slotProps={{ textarea: { spellCheck: 'false' } }}
								required
								variant='soft'
								placeholder='question...'
								{...field}
							/>
						</FormControl>
					)}
				/>
				{fields.map((field, index) => {
					return (
						<Controller
							key={field.id}
							name={`correctAnswers.${index}`}
							control={control}
							render={({ field }) => {
								return (
									<FormControl>
										<FormLabel>{`Answer ${index + 1}`}</FormLabel>
										<Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
											<Textarea
												slotProps={{ textarea: { spellCheck: 'false' } }}
												variant='soft'
												{...field}
												placeholder='answer is ...'
												required
												value={field.value}
												sx={{ width: '100%' }}
											/>
											<IconButton
												onClick={() => {
													remove(index);
												}}>
												<DeleteOutlineIcon />
											</IconButton>
										</Box>
									</FormControl>
								);
							}}
						/>
					);
				})}
				<IconButton
					onClick={() => {
						append('');
					}}>
					<AddCircleOutlineIcon />
				</IconButton>

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
