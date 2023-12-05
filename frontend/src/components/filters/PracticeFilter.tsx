import { Box, Button, FormControlLabel, FormGroup, Paper, TextField, Checkbox } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/ApiService';
import { map } from '../../utils';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';

export default function PracticeFilter() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: categories, error, isLoading } = api.useGetCategoriesQuery();

	const { handleSubmit, control } = useForm<any>({
		defaultValues: {
			count: 10,
		},
	});

	const submit: SubmitHandler<any> = async (q) => {
		Object.keys(q).forEach((key) => (q[key] === undefined || q[key] === false) && delete q[key]);
		setSearchParams({});
		setSearchParams(q);
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
									max: 100,
									min: 10,
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
