import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_ADMIN_KEY, IS_PUBLIC_KEY } from './decorators';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		//Проверка на публичные методы
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (isPublic) {
			if (!token) {
				return true;
			}

			//Для публичного метода тоже кладем пользователя
			let payload = {};
			try {
				payload = await this.jwtService.verifyAsync(token, {
					secret: process.env.JWT_SECRET,
				});
				request['user'] = payload;
			} catch {
			} finally {
				return true;
			}
		}

		if (!token) {
			throw new UnauthorizedException();
		}

		//Проверка токена
		let payload = {};
		try {
			payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}

		//Доступ только для админов
		const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isAdmin) {
			if (payload['isAdmin']) {
				return true;
			} else {
				throw new ForbiddenException();
			}
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
