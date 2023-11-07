import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { ICategory, ILoginAnswer, IQuestion, IUser } from '../types';
import { token } from './auth';

//функция запроса с токеном
const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8001',
	prepareHeaders: (headers, query) => {
		const jwtToken = token.getToken();
		jwtToken && headers.set('authorization', 'Bearer ' + jwtToken);
		return headers;
	},
});

//функция запроса с удалением токена при отсутствии авторизации
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
		fetchQuestions: builder.query<IQuestion[], void>({
			query: () => ({
				url: `/questions`,
				params: {},
			}),
		}),
		getUsers: builder.query<IUser[], void>({
			query: () => ({
				url: `/users`,
				params: {},
			}),
		}),
		getCategories: builder.query<ICategory[], void>({
			query: () => ({
				url: `/categories`,
				params: {},
			}),
		}),
		//TODO добавить переход по _url
		postLogin: builder.mutation<ILoginAnswer, ILogin>({
			query: ({ email, password }) => ({
				url: `auth/login`,
				method: 'POST',
				body: { email, password },
			}),
		}),
		createQuestion: builder.mutation<IQuestion, Partial<IQuestion>>({
			query: (question) => ({
				url: '/questions',
				method: 'POST',
				body: question,
			}),
		}),
	}),
});

// export const { useFetchQuestions } = ApiService;
export default api;
