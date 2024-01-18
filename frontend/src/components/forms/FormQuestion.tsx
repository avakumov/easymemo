import { SubmitHandler, useForm, Controller, useFieldArray } from 'react-hook-form';
import { EntityNames, IQuestion, IQuestionForm } from '../../types';
import api from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, IconButton, Option, Select, Textarea, Typography } from '@mui/joy';
import { showMessage } from '../../store/slices/messageSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { isURL } from '../../utils';

export default function FormQuestion({ data, exit }: { exit: () => void; data?: IQuestion }) {
	const [createQuestion] = api.useCreateQuestionMutation();
	const [updateQuestion] = api.useUpdateQuestionMutation();
	const { data: categories } = api.useGetCategoriesQuery();
	const dispatch = useDispatch();

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<IQuestionForm>({
		defaultValues: {
			id: data?.id ?? 0,
			question: data?.question ?? '',
			categories: Array.isArray(data?.categories) ? data?.categories.map((c) => c.id) : [],
			rightAnswers: data?.rightAnswers.split(' |-| ') ?? [' '],
			url: data?.url ?? '',
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: 'rightAnswers' as never,
		control,
		rules: {
			required: 'Please append at least 1 item',
		},
	});
	watch();

	const submit: SubmitHandler<IQuestionForm> = async (q) => {
		try {
			const prepQuestion = { ...q, rightAnswers: q.rightAnswers.join(' |-| ') };
			let saveQuestion = null;
			if (prepQuestion.id) {
				saveQuestion = await updateQuestion(prepQuestion).unwrap();
			} else {
				saveQuestion = await createQuestion(prepQuestion).unwrap();
			}

			//show success message
			saveQuestion?.id && dispatch(showMessage({ message: 'Quesiton saved', type: 'success' }));

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
							name={`rightAnswers.${index}`}
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
							slotProps={{ listbox: { sx: { width: '100%' } } }}
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
				<Controller
					name='url'
					control={control}
					rules={{
						required: false,
						validate: (value) => {
							if (value === '') return true;
							return isURL(value);
						},
					}}
					render={({ field }) => {
						// console.log(field);
						return (
							<FormControl>
								<FormLabel>URL</FormLabel>
								<Textarea
									slotProps={{ textarea: { spellCheck: 'false', type: 'url' } }}
									variant='soft'
									placeholder='https://example.com'
									error={errors.url ? true : false}
									{...field}
								/>
							</FormControl>
						);
					}}
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
