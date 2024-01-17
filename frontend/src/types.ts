export enum EntityNames {
	USER = 'users',
	CATEGORY = 'categories',
	QUESTION = 'questions',
}
export type EntityKey = keyof typeof EntityNames;
export type EntityName = (typeof EntityNames)[EntityKey] | undefined | null;

export interface ICategory {
	id: number;
	name: string;
	description?: string;
	published: boolean;
	createdAt: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface ILoginAnswer {
	access_token: string;
}

export interface IQuestion {
	id: number;
	description?: string;
	question: string;
	answer: string;
	rightAnswers: string;
	categories: ICategory[];
}

export type IQuestionForm = {
	categories: number[];
	rightAnswers: string[];
	id?: number;
	question?: string;
};

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	themeInterface: string;
}

export interface IProfile {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
	entities: string[];
	themeInterface: string;
}

export interface ICategoryForm {
	id?: number;
	description?: string;
	name: string;
}

export type IEntity = IQuestion | IUser | ICategory | undefined;
