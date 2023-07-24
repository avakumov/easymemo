import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin, ILoginAnswer } from '../models/ILogin';
import { IQuestion } from '../models/IQuestion';
import { token } from './auth';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8001',
	prepareHeaders: (headers, query) => {
		const jwtToken = token.getToken();
		console.log('token: ', jwtToken);
		jwtToken && headers.set('authorization', 'Bearer ' + jwtToken);
		return headers;
	},
});

const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		token.removeToken();
		const url = localStorage.getItem('_url');
		url && localStorage.removeItem('_url');
		window.location.href = url ?? '/admin';
	}
	return result;
};

const api = createApi({
	reducerPath: 'mainApi',
	baseQuery: baseQueryWithLogout,

	endpoints: (builder) => ({
		fetchQuestions: builder.query<IQuestion[], number>({
			query: (limit) => ({
				url: `/questions`,
				params: {},
			}),
		}),
		postLogin: builder.mutation<ILoginAnswer, ILogin>({
			query: ({ email, password }) => ({
				url: `auth/login`,
				method: 'POST',
				body: { email, password },
			}),
		}),
	}),
});

// export const { useFetchQuestions } = ApiService;
export default api;
