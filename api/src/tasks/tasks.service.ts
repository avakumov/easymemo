import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestExtended } from 'src/entities/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable({ scope: Scope.REQUEST })
export class TasksService {
	constructor(private prisma: PrismaService, @Inject(REQUEST) private request: RequestExtended) {}
	create(createTaskDto: CreateTaskDto) {
		return this.prisma.task.create({
			data: {
				...createTaskDto,
				owner: {
					connect: {
						id: this.request.user.userId,
					},
				},
			},
		});
	}

	findAll() {
		const userId = this.request.user?.userId;
		const isAdmin = this.request.user?.isAdmin;

		return this.prisma.task.findMany({
			where: {
				...(isAdmin ? {} : { ownerId: userId }),
			},
			orderBy: {
				id: 'desc',
			},
		});
	}

	findOne(id: number) {
		console.log('id', id);
		return this.prisma.task.findUnique({
			where: { id },
		});
	}

	update(id: number, updateTaskDto: UpdateTaskDto) {
		return this.prisma.task.update({
			where: {
				id,
			},
			data: {
				...updateTaskDto,
			},
		});
	}

	remove(id: number) {
		return this.prisma.task.delete({
			where: {
				id,
			},
		});
	}
}
