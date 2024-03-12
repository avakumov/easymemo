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

export interface IRegisterForm {
	email: string;
	password: string;
	repeatPassword: string;
	firstName: string;
	lastName: string;
}

export type IRegister = Omit<IRegisterForm, 'repeatPassword'>;

export interface ILoginAnswer {
	access_token: string;
}

export interface IRegisterAnswer {
	access_token?: string;
	error?: {
		message: string;
	};
}

export interface IQuestion {
	id: number;
	description?: string;
	categories: ICategory[];
	question: string;
	answer: string;
	rightAnswers: string;
	url?: string;
}

export interface IQuestionModify {
	id: number;
	description?: string;
	categories: number[];
	question: string;
	answer: string;
	rightAnswers: string;
	url?: string;
}

export interface IQuestionNew {
	id: number;
	description?: string;
	categories: number[];
	question: string;
	answer: string;
	rightAnswers: string;
	url?: string;
}

export interface IQuestionForm {
	id: number;
	question: string;
	categories: number[];
	rightAnswers: string[];
	answer: string;
	url?: string;
}

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

export type ResponseSaveFileType = {
	file: {
		destination: string;
		//"./uploads/audio"
		encoding: string;
		//"7bit"
		fieldname: string;
		//"file"
		filename: string;
		//"93156430-2fa3-4d04-8d8a-8cc2db6cbaf2.wav"
		mimetype: string;
		//"audio/wav"
		originalname: string;
		//"audio.wav"
		path: string;
		//"uploads/audio/93156430-2fa3-4d04-8d8a-8cc2db6cbaf2.wav"
		size: number;
		//292908
	};
};

export type QuestionPracticeType = {
	id: number;
	question: string;
	status: 'active' | 'wait' | 'fail' | 'success';
	categories: {
		id: number;
		name: string;
	}[];
	answer?: string;
	rightAnswers?: string;
	isCurrentCorrect: boolean;
	currentAnswer?: string;
};
