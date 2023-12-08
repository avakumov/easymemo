import { ThemeProvider } from '@mui/material';
import { ReactFragment, ReactPortal } from 'react';
import { useThemeDetector } from '../../hooks/appearance';
import api from '../../services/ApiService';
import { theme } from '../../themes';
type ReactNode = ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
	children: ReactNode;
};

export default function ThemesProvider({ children }: Props) {
	const isDarkTheme = useThemeDetector();
	const { data: profile } = api.useGetProfileQuery();
	let themeName = profile?.themeInterface;

	if (themeName === 'system') {
		themeName = isDarkTheme ? 'dark' : 'light';
	}

	return <ThemeProvider theme={theme(themeName)}>{children}</ThemeProvider>;
}
