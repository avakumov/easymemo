import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import settings from '../../settings';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: settings.jwtLifeTime },
		}),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
