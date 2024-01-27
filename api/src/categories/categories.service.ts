import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestExtended } from 'src/entities/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesService {
	constructor(private prisma: PrismaService, @Inject(REQUEST) private request: RequestExtended) {}

	/* проверка на существование название категории у пользователя. Если существует выбрасывает исключение*/
	async checkOnExistName(c: CreateCategoryDto | UpdateCategoryDto) {
		const categoryExisting = await this.prisma.category.findFirst({
			where: {
				name: c.name,
				ownerId: this.request.user.userId,
			},
		});

		if (categoryExisting) {
			throw new HttpException('Категория с таким именем уже существует', HttpStatus.CONFLICT);
		}
	}

	async create(c: CreateCategoryDto) {
		await this.checkOnExistName(c);
		return this.prisma.category.create({
			data: {
				name: c.name,
				owner: {
					connect: {
						id: this.request.user.userId,
					},
				},
			},
		});
	}

	findAll() {
		const { userId, isAdmin } = this.request.user;
		const where = isAdmin ? null : { where: { ownerId: userId } };

		return this.prisma.category.findMany({
			...where,
			orderBy: {
				id: 'desc',
			},
			include: {
				_count: {
					select: {
						questions: true,
					},
				},
			},
		});
	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	async update(id: number, c: UpdateCategoryDto) {
		await this.checkOnExistName(c);
		return this.prisma.category.update({
			where: { id },
			data: {
				name: c.name,
			},
		});
	}

	remove(id: number) {
		return this.prisma.category.delete({
			where: { id },
		});
	}
}
