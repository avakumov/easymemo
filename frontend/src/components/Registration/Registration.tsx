import { Alert, Box, Button, FormLabel, FormControl, Grid, Input, Link, Sheet, Typography } from '@mui/joy';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import api from '../../services/ApiService';
import { token } from '../../services/auth';
import settings from '../../settings';
import { IRegisterForm } from '../../types';
import { isEmail } from '../../utils';

export default function Registration() {
	const [register] = api.useRegisterMutation();

	const {
		handleSubmit,
		control,
		setError,
		getValues,
		formState: { errors },
	} = useForm<IRegisterForm>({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
			firstName: '',
			lastName: '',
		},
		mode: 'onChange',
	});

	function isPasswordEquals(repeatPassword: string): boolean {
		const values = getValues();
		return repeatPassword === values.password;
	}

	const submit: SubmitHandler<IRegisterForm> = async (registerData) => {
		const { email, password, firstName, lastName } = registerData;

		const { access_token, error } = await register({ email, password, firstName, lastName }).unwrap();

		if (error) {
			return setError('root.serverError', { type: 'manual', message: error.message });
		}

		access_token && token.saveToken(access_token);
		window.location.href = `/`;
	};

	return (
		<Sheet
			variant='outlined'
			sx={{
				width: 'fit-content',
				margin: '50px auto',
				borderRadius: '1rem',
			}}>
			<Box
				sx={{
					px: 4,
					py: 6,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1'>Registration</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submit)}
					noValidate
					sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
					{errors.root?.serverError.message && (
						<Alert color='danger'>{errors.root?.serverError.message ?? 'Server error'}</Alert>
					)}

					<Controller
						name='firstName'
						control={control}
						rules={{ required: true, minLength: 3 }}
						render={({ field }) => (
							<FormControl>
								<FormLabel>First name</FormLabel>
								<Input
									required
									fullWidth
									id='firstname'
									placeholder='first name'
									autoFocus
									error={errors.firstName ? true : false}
									{...field}
								/>
							</FormControl>
						)}
					/>
					<Controller
						name='lastName'
						control={control}
						rules={{ required: true, minLength: 3 }}
						render={({ field }) => (
							<FormControl>
								<FormLabel>Last name</FormLabel>
								<Input
									required
									fullWidth
									id='lastname'
									placeholder='last name'
									error={errors.lastName ? true : false}
									{...field}
								/>
							</FormControl>
						)}
					/>
					<Controller
						name='email'
						control={control}
						rules={{ validate: isEmail }}
						render={({ field }) => (
							<FormControl>
								<FormLabel>email</FormLabel>
								<Input
									required
									fullWidth
									id='email'
									placeholder='email'
									error={errors.email ? true : false}
									{...field}
								/>
							</FormControl>
						)}
					/>
					<Controller
						control={control}
						name='password'
						rules={{ required: true, minLength: 6 }}
						render={({ field }) => (
							<FormControl>
								<FormLabel>password</FormLabel>
								<Input
									required
									fullWidth
									placeholder='password'
									type='password'
									id='password'
									autoComplete='current-password'
									{...field}
								/>
							</FormControl>
						)}
					/>

					<Controller
						control={control}
						name='repeatPassword'
						rules={{ required: true, minLength: 6, validate: isPasswordEquals }}
						render={({ field }) => (
							<FormControl>
								<FormLabel>repeat password</FormLabel>
								<Input
									required
									fullWidth
									type='password'
									placeholder='repeat password'
									id='repeat-password'
									autoComplete='current-password'
									error={errors.repeatPassword ? true : false}
									{...field}
								/>
							</FormControl>
						)}
					/>
					<Button type='submit' variant='soft' fullWidth sx={{ mt: 3, mb: 2 }}>
						Register
					</Button>
					<Grid container>
						<Grid xs>
							<Link href='#'>Forgot password?</Link>
						</Grid>
						<Grid>
							<Link href='/'>Login</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Sheet>
	);
}
