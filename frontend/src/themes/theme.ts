import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
	typography: {
		fontFamily: ['"Pragmata Pro"', '"Mononoki Nerd"', 'Iosevka', 'Roboto'].join(','),
	},
	palette: {
		mode: 'dark',
		background: {
			default: '#1c1c1c',
		},
		text: {
			primary: '#b8bb26',
		},
	},
});
