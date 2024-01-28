import { Injectable, Scope, Inject } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { RequestExtended } from 'src/entities/request';
import settings from '../../settings';
import { QuestionsFilter } from 'src/types';

@Injectable({ scope: Scope.REQUEST })
export class QuestionsService {
	constructor(private prisma: PrismaService, @Inject(REQUEST) private request: RequestExtended) {}

	create(q: CreateQuestionDto) {
		return this.prisma.question.create({
			data: {
				question: q.question,
				url: q.url,
				rightAnswers: q.rightAnswers
					.split(settings.separatorInDBString)
					.map((q) => q.trim())
					.join(settings.separatorInDBString),
				categories: {
					connect: q.categories.map((c) => ({ id: +c })) ?? [],
				},
				owner: {
					connect: {
						id: this.request.user.userId,
					},
				},
			},
		});
	}

	/*Проверка вопроса */
	async checkAnswer({ questionId, answer }: { questionId: number; answer: string }) {
		const question = await this.prisma.question.findUnique({
			where: {
				id: questionId,
			},
		});
		if (question) {
			const rightAnswers = question.rightAnswers ? question.rightAnswers.split(settings.separatorInDBString) : [];
			let isRight = false;
			for (const rightAnswer of rightAnswers) {
				if (answer.trim() === rightAnswer.trim()) {
					isRight = true;
					break;
				}
			}
			const status = isRight ? 'success' : 'fail';

			/*вносим логи*/
			await this.prisma.answer.create({
				data: {
					action: status,
					question: {
						connect: {
							id: question.id,
						},
					},
					owner: {
						connect: {
							id: this.request.user.userId,
						},
					},
				},
			});

			return { status, rightAnswers };
		}
	}

	async practice({ categories, count }: { categories: string[]; count: number }) {
		const { questions } = await this.find({ filter: { categories } });

		/*удаляем правильные ответы*/
		const questionsWithoutRightAnsters = questions.map((q) => {
			/*@ts-ignore*/
			delete q.rightAnswers;
			return q;
		});

		//TODO refactor this for best performance
		/*выбираем необходимое количество*/
		return getRandom(questionsWithoutRightAnsters, count);

		/*Для взятия случайных элементов в количестве count */
		function getRandom(arr: Array<any>, count: number) {
			const res: any[] = [];
			if (Array.isArray(arr) && !isNaN(count)) {
				let len = arr.length;
				if (len < count) {
					count = len;
				}
				for (let i = 0; i < count; i++) {
					len = arr.length;
					const randomIndex = Math.floor(Math.random() * len);
					res.push(arr.splice(randomIndex, 1)[0]);
				}
			}
			return res;
		}
	}

	async find({
		skip,
		take,
		search,
		filter,
	}: {
		skip?: number;
		take?: number;
		search?: string;
		filter?: QuestionsFilter;
	}) {
		const { userId, isAdmin } = this.request.user;

		//Если filter null,undef - фильтр выключен
		let categoryFilterQuery = {};
		if (Array.isArray(filter?.categories)) {
			if (filter?.categories.length === 0) {
				categoryFilterQuery = {
					categories: {
						none: {},
					},
				};
			} else {
				categoryFilterQuery = {
					categories: {
						some: {
							name: {
								in: filter?.categories,
							},
						},
					},
				};
			}
		}

		const [questions, count] = await this.prisma.$transaction([
			this.prisma.question.findMany({
				where: {
					...(isAdmin ? {} : { ownerId: userId }),
					...categoryFilterQuery,
					...(search
						? {
								OR: [
									{
										question: {
											contains: search,
											mode: 'insensitive',
										},
									},
									{
										rightAnswers: {
											contains: search,
											mode: 'insensitive',
										},
									},
								],
						  }
						: {}),
				},
				...(take ? { take } : {}),
				...(skip ? { skip } : {}),
				include: {
					categories: true,
				},
				orderBy: {
					id: 'desc',
				},
			}),

			this.prisma.question.count({
				where: {
					...(isAdmin ? {} : { ownerId: userId }),
					...categoryFilterQuery,
					...(search
						? {
								OR: [
									{
										question: {
											contains: search,
											mode: 'insensitive',
										},
									},
									{
										rightAnswers: {
											contains: search,
											mode: 'insensitive',
										},
									},
								],
						  }
						: {}),
				},
			}),
		]);

		return {
			total: count,
			questions,
		};
	}

	findOne(id: number) {
		return this.prisma.question.findUnique({ where: { id } });
	}

	update(id: number, q: CreateQuestionDto) {
		return this.prisma.question.update({
			where: { id },
			data: {
				question: q.question,
				url: q.url,
				rightAnswers: q.rightAnswers
					.split(settings.separatorInDBString)
					.map((q) => q.trim())
					.join(settings.separatorInDBString),
				categories: {
					set: q.categories?.map((c) => ({ id: +c })) ?? [],
				},
			},
			include: {
				categories: true,
				owner: true,
			},
		});
	}

	remove(id: number) {
		return this.prisma.question.delete({
			where: {
				id,
			},
		});
	}
}
