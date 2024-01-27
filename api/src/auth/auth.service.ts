import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}
	async signIn(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne({ email });
		//TODO hash password
		if (user?.password != pass) {
			throw new UnauthorizedException();
		}
		const payload = {
			userId: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async register({
		email,
		password,
		firstName,
		lastName,
	}: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}): Promise<any> {
		let user = await this.usersService.findOne({ email });
		if (user) {
			return {
				error: { message: 'User exist' },
			};
		}

		//new user
		user = await this.usersService.create({
			email: email,
			password: password,
			name: `${firstName} ${lastName}`,
		});

		const payload = {
			userId: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		};

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
