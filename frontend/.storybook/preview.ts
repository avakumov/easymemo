import type { Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { lightTheme, darkTheme } from '../src/themes';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {},
	},
};
export const decorators = [
	withThemeFromJSXProvider({
		themes: {
			light: lightTheme,
			dark: darkTheme,
		},
		defaultTheme: 'dark',
		Provider: ThemeProvider,
		GlobalStyles: CssBaseline,
	}),
];

export default preview;
