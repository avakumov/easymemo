import { useSearchParams } from 'react-router-dom';
import api from '../../services/ApiService';
import { map } from '../../utils';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import settings from '../../settings';
import { Box, Button, Checkbox, Input, Sheet } from '@mui/joy';

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

	function replayHandler() {
		dispatch(api.util.invalidateTags(['practice']));
	}

	const submit: SubmitHandler<any> = async (q) => {
		//TODO watch time
	};

	return (
		<Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(submit)}>
			<Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
				{map(categories, (c) => (
					<Controller name={c.name} control={control} render={({ field }) => <Checkbox {...field} />} />
				))}
				<Controller name='count' control={control} render={({ field }) => <Input type='number' {...field} />} />
				<Button onClick={replayHandler} startDecorator={<ReplayIcon />}>
					update
				</Button>
			</Sheet>
		</Box>
	);
}
