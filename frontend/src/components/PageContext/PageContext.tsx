import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePageContext } from '../../store/slices/pageContextSlice';
import { PageContextType } from '../../types';

function PageContext({ children, context }: { children: ReactNode; context: PageContextType | undefined }) {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!context) return;
		dispatch(changePageContext(context));
	}, [context, dispatch]);

	return <>{children}</>;
}
export default PageContext;
