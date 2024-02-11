import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import mailerConfig from './config/mailer.config';
import appConfig from './config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [mailerConfig, appConfig],
			envFilePath: ['.env'],
		}),
		PrismaModule,
		QuestionsModule,
		UsersModule,
		AuthModule,
		CategoriesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
