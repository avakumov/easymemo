import React, { ReactElement, ReactFragment, ReactPortal } from 'react';
import { token } from '../../services/auth';
import Login from '../Login/Login';

export default function Auth({
	children,
}: {
	children: ReactElement | ReactFragment | ReactPortal | boolean | null | undefined;
}) {
	const auth = token.getToken() ? true : false;
	const href = window.location.href;
	return auth ? <>{children}</> : <Login href={href} />;
}
