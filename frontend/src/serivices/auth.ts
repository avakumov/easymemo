const getToken = () => {
	const token = localStorage.getItem('jwt');

	return token;
};

const saveToken = (token: string) => {
	localStorage.setItem('jwt', token);
};

const removeToken = () => {
	localStorage.removeItem('jwt');
};

export const token = { getToken, saveToken, removeToken };
