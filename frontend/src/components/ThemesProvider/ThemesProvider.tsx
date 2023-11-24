import { ThemeProvider } from '@mui/material';
import { ReactFragment, ReactPortal } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { theme } from '../../themes';
type ReactNode = ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
	children: ReactNode;
};
export default function ThemesProvider({ children }: Props) {
	const themeName = useSelector((state: RootState) => state.theme.name);
	return <ThemeProvider theme={theme(themeName)}>{children}</ThemeProvider>;
}
