import api from '../../services/ApiService';

import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Checkbox, Option, ListItem, Select, Sheet, Typography } from '@mui/joy';
import { RootState } from '../../store/store';
import { Controller, useForm } from 'react-hook-form';
import { closePracticeFilterModal, setPracticeFilter } from '../../store/slices/practiceSlice';

type FormType = Record<string, boolean | number>;

export default function PracticeFilter() {
	const dispatch = useDispatch();
	const filter = useSelector((state: RootState) => state.practice.filter);
	const { data: categories } = api.useGetCategoriesQuery();

	const cats: Record<string, boolean> = {};
	const defaultValues = {
		count: filter.count,
		...filter.categories.reduce((acc, cur) => {
			acc[cur as keyof typeof cats] = true;
			return acc;
		}, cats),
	};

	const { handleSubmit, control, setValue } = useForm<FormType>({ defaultValues });

	const submit = (formData: FormType) => {
		const count: number = formData.count as number;
		delete formData['count'];
		const categories: string[] = [];
		Object.keys(formData).forEach((key) => {
			if (formData[key]) {
				categories.push(key);
			}
		});
		const filter = {
			count,
			categories,
		};
		dispatch(setPracticeFilter({ filter }));
		dispatch(closePracticeFilterModal());
	};

	return (
		<Sheet component='form' onSubmit={handleSubmit(submit)}>
			<Typography level='title-lg' sx={{ mb: '2rem', textAlign: 'center' }}>
				Filter on practice
			</Typography>
			<Typography level='body-lg' sx={{ mb: '2px', pl: '1rem' }}>
				Categories
			</Typography>
			<Sheet variant='outlined' sx={{ borderRadius: '1rem', mb: '2rem', p: '0.5rem' }}>
				<Box
					sx={{
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap',
						justifyContent: 'center',
						'--ListItem-radius': '1rem',
					}}>
					{Array.isArray(categories) &&
						categories.map((item) => (
							<ListItem key={item.id} sx={{ py: '0.5rem', px: '1rem' }}>
								<Controller
									name={item.name}
									control={control}
									render={({ field }) => (
										<Checkbox
											{...field}
											overlay
											disableIcon
											variant='soft'
											label={item.name}
											checked={field.value ? true : false}
											value={field.value ? '1' : '0'}
										/>
									)}
								/>
							</ListItem>
						))}
				</Box>
			</Sheet>

			<Typography level='body-lg' sx={{ mb: '2px', pl: '1rem' }}>
				Count
			</Typography>
			<Sheet variant='outlined' sx={{ borderRadius: '1rem', mb: '2rem', p: '0.5rem' }}>
				<Controller
					name='count'
					control={control}
					render={({ field }) => (
						<Select
							variant='soft'
							slotProps={{ listbox: { sx: { width: '100%' } } }}
							{...field}
							value={field.value ? field.value : undefined}
							onChange={(_, newValue) => {
								newValue && setValue('count', newValue);
							}}>
							{[10, 50, 100].map((count) => (
								<Option key={count} value={count}>
									{count}
								</Option>
							))}
						</Select>
					)}
				/>
			</Sheet>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='soft' onClick={() => dispatch(closePracticeFilterModal())}>
					Cancel
				</Button>
				<Button variant='soft' type='submit'>
					Ok
				</Button>
			</Box>
		</Sheet>
	);
}
