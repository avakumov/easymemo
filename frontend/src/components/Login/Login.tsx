import { Box, Button, Container, Grid, Input, Link, Sheet, Typography } from '@mui/joy';
import api from '../../services/ApiService';
import { token } from '../../services/auth';
import settings from '../../settings';

export default function Login({ href }: { href?: undefined | string }) {
	const [login, status] = api.usePostLoginMutation();
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');
		if (email && password && typeof email === 'string' && typeof password === 'string') {
			const { access_token } = await login({ email, password }).unwrap();
			access_token && token.saveToken(access_token);
			window.location.href = href ?? '/practice';
		}
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
				<Typography component='h1'>Login</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Input required fullWidth id='email' name='email' autoComplete='email' autoFocus />
					<Input
						required
						fullWidth
						name='password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<Button type='submit' variant='soft' fullWidth sx={{ mt: 3, mb: 2 }}>
						login
					</Button>
					<Grid container>
						<Grid xs>
							<Link href='#'>Forgot password?</Link>
						</Grid>
						<Grid>
							<Link href={`/registration`}>Registration</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Sheet>
	);
}
