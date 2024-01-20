import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
	EntityName,
	ICategory,
	ILogin,
	ILoginAnswer,
	IProfile,
	IQuestion,
	IQuestionModify,
	IQuestionNew,
	IUser,
} from '../types';
import { token } from './auth';

const baseUrl = import.meta.env.PROD ? 'https://avakumov.ru/api' : 'http://localhost:8001/api';
/*функция запроса с токеном*/
const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, query) => {
		const jwtToken = token.getToken();
		jwtToken && headers.set('authorization', 'Bearer ' + jwtToken);
		return headers;
	},
});

/*функция запроса с удалением токена при отсутствии авторизации*/
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
	}
	return result;
};

const api = createApi({
	reducerPath: 'mainApi',
	baseQuery: baseQueryWithLogout,
	tagTypes: ['questions', 'users', 'categories', 'profile', 'practice'],
	endpoints: (builder) => ({
		checkAnwer: builder.mutation<
			{ status: 'fail' | 'success'; rightAnswers: string },
			{ questionId: number; answer: string }
		>({
			query: (body) => ({
				url: `questions/checkanswer`,
				method: 'POST',
				body,
			}),
		}),
		getPractice: builder.query<IQuestion[], { categories: string[]; count: number } | undefined>({
			query: (filter) => ({
				url: `/questions/practice`,
				method: 'POST',
				body: filter,
			}),
			providesTags: ['practice'],
		}),
		getQuestions: builder.query<
			{ questions: IQuestion[]; total: number },
			{ skip?: number; take?: number; search?: string; filter: string[] }
		>({
			query: ({ skip, take, search, filter }) => {
				return {
					url: `/questions/find`,
					method: 'POST',
					body: { skip, take, search, filter },
				};
			},
			providesTags: ['questions'],
		}),
		getUsers: builder.query<IUser[], void>({
			query: () => ({
				url: `/users`,
				params: {},
			}),
			providesTags: ['users'],
		}),
		getCategories: builder.query<(ICategory & { _count: { questions: number } })[], void>({
			query: () => ({
				url: `/categories`,
				params: {},
			}),
			providesTags: ['categories'],
		}),
		postLogin: builder.mutation<ILoginAnswer, ILogin>({
			query: ({ email, password }) => ({
				url: `auth/login`,
				method: 'POST',
				body: { email, password },
			}),
		}),
		createQuestion: builder.mutation<IQuestion, IQuestionNew>({
			query: (question) => ({
				url: '/questions',
				method: 'POST',
				body: question,
			}),
		}),
		updateQuestion: builder.mutation<IQuestion, IQuestionModify>({
			query: (question) => ({
				url: `/questions/${question.id}`,
				method: 'PATCH',
				body: question,
			}),
		}),
		createCategory: builder.mutation<ICategory, Partial<ICategory>>({
			query: (category) => ({
				url: '/categories',
				method: 'POST',
				body: category,
			}),
		}),
		updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
			query: (category) => ({
				url: `/categories/${category.id}`,
				method: 'PATCH',
				body: category,
			}),
		}),
		removeEntity: builder.mutation<{ id: number }, { id: number; entityName: EntityName }>({
			query: ({ id, entityName }) => ({
				url: `/${entityName}/${id}`,
				method: 'DELETE',
			}),
		}),
		getProfile: builder.query<IProfile, void>({
			query: () => ({
				url: 'auth/profile',
			}),
			providesTags: ['profile'],
		}),
		changeTheme: builder.mutation<IUser, Pick<IUser, 'id' | 'themeInterface'>>({
			query: (pickedUser) => ({
				url: `/users/${pickedUser.id}`,
				method: 'PATCH',
				body: { themeInterface: pickedUser.themeInterface },
			}),
		}),
	}),
});

export default api;
