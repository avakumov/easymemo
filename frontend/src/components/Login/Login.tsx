import { Box, Button, Container, Grid, Input, Link, Typography } from '@mui/joy';
import api from '../../services/ApiService';
import { token } from '../../services/auth';

export default function Login({ href }: { href: undefined | string }) {
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
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1'>Login</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Input required fullWidth id='email' name='email' autoComplete='email' autoFocus />
					<Input
						required
						fullWidth
						name='password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }}>
						login
					</Button>
					<Grid container>
						<Grid xs>
							<Link href='#'>Forgot password?</Link>
						</Grid>
						<Grid>
							<Link href='#'>{'Register'}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
