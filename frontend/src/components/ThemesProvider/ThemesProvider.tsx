import { ThemeProvider } from '@mui/material';
import { ReactFragment, ReactPortal } from 'react';
import api from '../../services/ApiService';
import { theme } from '../../themes';
type ReactNode = ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
	children: ReactNode;
};
export default function ThemesProvider({ children }: Props) {
	const { data: profile } = api.useGetProfileQuery();
	return <ThemeProvider theme={theme(profile?.themeInterface)}>{children}</ThemeProvider>;
}
