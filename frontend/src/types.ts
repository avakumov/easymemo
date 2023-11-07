export enum EntityNames {
	USER = 'user',
	CATEGORY = 'category',
	QUESTION = 'question',
}
export type EntityKey = keyof typeof EntityNames;
export type EntityName = (typeof EntityNames)[EntityKey] | undefined | null | string;

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
	id?: number;
	description?: string;
	question: string;
	answer: string;
	categories: ICategory[];
	// id                 Int        @id @default(autoincrement())
	// description        String?
	// question           String     @unique
	// answer             String     @unique
	// published          Boolean    @default(false)
	// createdAt          DateTime   @default(now())
	// updateAt           DateTime   @updatedAt
	// viewCount          Int        @default(0)
	// successAnswerCount Int        @default(0)
	// failAnswerCount    Int        @default(0)
	// owner              User       @relation(fields: [ownerId], references: [id])
	// ownerId            Int
	// categories         Category[]
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
}

export type IEntity = IQuestion | IUser | ICategory | undefined;
