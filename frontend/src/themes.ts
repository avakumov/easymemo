import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { merge as lodash_merge } from 'lodash';

const sharedStyles = {
	typography: {
		fontSize: 12,
	},
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: '5px',
					paddingLeft: '10px',
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

const darkStyles = {
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
		mode: 'dark' as PaletteMode,
		background: {
			default: '#1c1c1c',
		},
		text: {
			primary: '#b8bb26',
		},
	},
};

const lightStyles = {};

const dark = lodash_merge({}, sharedStyles, darkStyles);
const light = lodash_merge({}, sharedStyles, lightStyles);

export const darkTheme = createTheme(dark);

export const lightTheme = createTheme(light);

export function theme(mode: string | undefined = 'light') {
	return mode === 'light' ? lightTheme : darkTheme;
}
