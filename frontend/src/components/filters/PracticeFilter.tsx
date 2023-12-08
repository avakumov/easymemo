import { Box, Button, FormControlLabel, FormGroup, Paper, TextField, Checkbox } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/ApiService';
import { map } from '../../utils';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import settings from '../../settings';

interface ParamsI {
	count: number;
	[index: string]: boolean | number;
}

export default function PracticeFilter() {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: categories } = api.useGetCategoriesQuery();

	/*По умолчанию выбрана первая категория*/
	useEffect(() => {
		const currentCategory = searchParams.get('categories');
		if (!currentCategory && categories && categories[0]) {
			setSearchParams({ categories: categories[0].name });
		}
	}, [categories, searchParams, setSearchParams]);

	const { handleSubmit, control, watch } = useForm<any>({
		defaultValues: {
			count: settings.practice.DEFAULT_TASK_COUNT,
		},
	});

	/*синхронизировать форму со строкой запроса*/
	useEffect(() => {
		const subscription = watch((q) => {
			//сбрасываем кеш для получения новых заданий
			dispatch(api.util.invalidateTags(['practice']));
			//Устанавливам параметры запроса
			Object.keys(q).forEach((key) => (q[key] === undefined || q[key] === false) && delete q[key]);
			const paramsCategories = getParamsForRequest(q);
			setSearchParams({});
			setSearchParams(paramsCategories);
		});
		return () => subscription.unsubscribe();
	}, [dispatch, setSearchParams, watch]);

	function getParamsForRequest(formData: ParamsI) {
		const categories = getCategories(formData);
		const count = getCount(formData);
		return {
			...(count ? { count } : undefined),
			...(categories ? { categories } : undefined),
		};

		function getCount(formData: ParamsI) {
			return formData.count.toString() ?? undefined;
		}
		function getCategories(formData: ParamsI) {
			const categories: string[] = [];
			Object.keys(formData).forEach((key) => {
				if (formData[key] && key !== 'count') {
					categories.push(key);
				}
			});
			return categories;
		}
	}

	const submit: SubmitHandler<any> = async (q) => {
		//TODO watch time
	};

	return (
		<Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submit)}>
			<Paper sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
				<FormGroup>
					{map(categories, (c) => (
						<FormControlLabel
							key={c.id}
							label={c.name}
							control={
								<Controller
									name={c.name}
									control={control}
									render={({ field }) => <Checkbox {...field} />}
								/>
							}
						/>
					))}
				</FormGroup>
				<Controller
					name='count'
					control={control}
					render={({ field }) => (
						<TextField
							type='number'
							size='small'
							InputProps={{
								inputProps: {
									max: settings.practice.MAX_TASK_COUNT,
									min: settings.practice.MIN_TASK_COUNT,
								},
							}}
							{...field}
						/>
					)}
				/>
				<Button type='submit' variant='contained'>
					start
				</Button>
			</Paper>
		</Box>
	);
}
