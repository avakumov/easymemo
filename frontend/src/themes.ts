import { createTheme } from '@mui/material/styles';

const sharedStyles = {
	typography: {
		fontSize: 12,
	},
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: '5px',
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
};

export const darkTheme = createTheme({
	...sharedStyles,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					border: '#111 1px solid',
				},
			},
		},
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

export const lightTheme = createTheme({
	...sharedStyles,
});

export function theme(mode: string | undefined = 'light') {
	return mode === 'light' ? lightTheme : darkTheme;
}
