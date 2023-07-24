export interface IQuestion {
	id: number;
	description: string;
	question: string;
	answer: string;
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
