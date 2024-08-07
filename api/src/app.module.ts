import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { BooksModule } from './books/books.module';
import { TasksModule } from './tasks/tasks.module';
import { RegularTasksModule } from './regular-tasks/regular-tasks.module';
import { MicroTasksModule } from './micro-tasks/micro-tasks.module';
import mailerConfig from './config/mailer.config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [mailerConfig, appConfig, authConfig],
			envFilePath: ['.env'],
		}),
		PrismaModule,
		QuestionsModule,
		UsersModule,
		AuthModule,
		CategoriesModule,
		FilesModule,
		BooksModule,
		TasksModule,
		RegularTasksModule,
		MicroTasksModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
