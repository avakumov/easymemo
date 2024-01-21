import api from '../../services/ApiService';

import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Checkbox, ListItem, Sheet, Typography } from '@mui/joy';
import { RootState } from '../../store/store';
import { Controller, useForm } from 'react-hook-form';
import {
	closeQuestionsFilterModal,
	disableQuestionsFilter,
	enableQuestionsFilter,
	setQuestionsFilter,
} from '../../store/slices/filtersSlice';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { resetPage } from '../../store/slices/paginatorSlice';

type FormType = Record<string, boolean | number>;

export default function QuestionsFilter() {
	const dispatch = useDispatch();
	const filter = useSelector((state: RootState) => state.filters.questions.filter);
	const enabledFilter = useSelector((state: RootState) => state.filters.questions.enabled);
	const { data: categories } = api.useGetCategoriesQuery();

	const cats: Record<string, boolean> = {};
	const defaultValues = {
		...filter.categories.reduce((acc, cur) => {
			acc[cur as keyof typeof cats] = true;
			return acc;
		}, cats),
	};

	const { handleSubmit, control, setValue } = useForm<FormType>({ defaultValues });

	const submit = (formData: FormType) => {
		const categories: string[] = [];
		Object.keys(formData).forEach((key) => {
			if (formData[key]) {
				categories.push(key);
			}
		});
		const filter = {
			categories,
		};
		dispatch(setQuestionsFilter(filter));
		dispatch(resetPage());
		dispatch(closeQuestionsFilterModal());
	};

	function toggleFilterOn(state: boolean) {
		dispatch(state ? disableQuestionsFilter() : enableQuestionsFilter());
		dispatch(resetPage());
	}

	return (
		<Sheet component='form' onSubmit={handleSubmit(submit)}>
			<Typography level='title-lg' sx={{ mb: '1rem', textAlign: 'center' }}>
				Questions filter
			</Typography>
			<Box sx={{ mb: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Button
					variant='plain'
					onClick={() => toggleFilterOn(enabledFilter)}
					startDecorator={enabledFilter ? <FilterAltIcon /> : <FilterAltOffIcon />}>
					{enabledFilter ? 'Switch off filter' : 'Switch on filter'}
				</Button>
			</Box>
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
											disabled={!enabledFilter}
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

			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='soft' onClick={() => dispatch(closeQuestionsFilterModal())}>
					Cancel
				</Button>
				<Button variant='soft' type='submit'>
					Ok
				</Button>
			</Box>
		</Sheet>
	);
}
