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

			const userId = this.request.user?.userId;
			/*если пользователь не залогинен, то возвращаем статус и правильные ответы*/
			if (!userId) return { status, rightAnswers };
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

	/*Проверка текущего ответа на вопрос */
	async checkCurrentAnswer({ questionId, answer }: { questionId: number; answer: string }) {
		if (answer.trim() === '') return { isRight: false };

		const question = await this.prisma.question.findUnique({
			where: {
				id: questionId,
			},
		});
		if (question) {
			const rightAnswers = question.rightAnswers ? question.rightAnswers.split(settings.separatorInDBString) : [];
			let isRight = false;
			for (const rightAnswer of rightAnswers) {
				if (rightAnswer.trim().startsWith(answer.trim())) {
					isRight = true;
					break;
				}
			}
			return { isRight };
		}
		throw new Error('Question not found');
	}

	async practice({ categories, count }: { categories: string[]; count: number }) {
		const { questions } = await this.find({ filter: { categories } });

		/*удаляем правильные ответы*/
		const questionsWithoutRightAnswers = questions.map((q) => {
			/*@ts-ignore*/
			delete q.rightAnswers;
			return q;
		});

		//TODO refactor this for best performance
		/*выбираем необходимое количество*/
		return getRandom(questionsWithoutRightAnswers, count);

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
		const userId = this.request.user?.userId;
		const isAdmin = this.request.user?.isAdmin;

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
					...(isAdmin ? {} : userId ? { ownerId: userId } : { shared: true }),
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
					...(isAdmin ? {} : userId ? { ownerId: userId } : { shared: true }),
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
		return this.prisma.question.findUnique({
			where: { id },
			include: {
				categories: true,
			},
		});
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
