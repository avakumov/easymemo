import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
	typography: {
		fontSize: 14,
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
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					border: '#111 2px solid',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				head: {
					fontWeight: 600,
				},
			},
		},
	},
});
