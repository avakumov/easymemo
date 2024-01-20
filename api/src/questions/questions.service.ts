import { Injectable, Scope, Inject } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { REQUEST } from "@nestjs/core";
import { RequestExtended } from "src/entities/request";
import settings from "../../settings";
import { QuestionsFilter } from "src/types";
import { removeDuplicatesById } from "src/utils";

@Injectable({ scope: Scope.REQUEST })
export class QuestionsService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private request: RequestExtended
  ) {}

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
  async checkAnswer({
    questionId,
    answer,
  }: {
    questionId: number;
    answer: string;
  }) {
    const question = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    if (question) {
      const rightAnswers = question.rightAnswers.split(
        settings.separatorInDBString
      );
      let isRight = false;
      for (const rightAnswer of rightAnswers) {
        if (answer.trim() === rightAnswer.trim()) {
          isRight = true;
          break;
        }
      }
      const status = isRight ? "success" : "fail";

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

  async practice({
    categories,
    count,
  }: {
    categories: string[];
    count: number;
  }) {
    /*если не указаны категории берем из всех*/
    if (Array.isArray(categories) && categories.length === 0) {
      const questions = await this.prisma.question.findMany({
        include: {
          categories: true,
        },
      });
      return getRandom(questions, count);
    }
    const questions = await this.getQuestionsWithFilter({ categories });

    /*удаляем правильные ответы*/
    questions.forEach((q) => {
      delete q.rightAnswers;
    });

    //TODO refactor this for best performance
    /*выбираем необходимое количество*/
    return getRandom(questions, count);

    /*Для взятия случайных элементов в количестве count */
    function getRandom(arr: any[], count: number) {
      const res = [];
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

  private async getQuestionsWithFilter(filter: { categories: string[] }) {
    const { userId, isAdmin } = this.request.user;
    const { categories } = filter;
    if (Array.isArray(categories) && categories.length !== 0) {
      const dirtyQuestions = await Promise.all(
        categories.map(async (c: string): Promise<any> => {
          return this.prisma.category
            .findFirst({
              where: {
                AND: [
                  {
                    name: { equals: c },
                  },
                  isAdmin ? {} : { ownerId: userId },
                ],
              },
            })
            .questions({
              include: { categories: true },
            });
        })
      );
      const questionsWithDublicates = dirtyQuestions.flat();
      return removeDuplicatesById(questionsWithDublicates);
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

    //Если массив категорий пустой то считаем что фильтр выключен
    const categoryFilterQuery =
      filter.categories.length === 0
        ? {}
        : {
            categories: {
              some: {
                name: {
                  in: filter.categories,
                },
              },
            },
          };

    const [questions, count] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        where: {
          ...(isAdmin ? {} : { ownerId: userId }),
          ...categoryFilterQuery,
          OR: [
            {
              question: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              rightAnswers: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        ...(take ? { take } : {}),
        ...(skip ? { skip } : {}),
        include: {
          categories: true,
        },
        orderBy: {
          id: "desc",
        },
      }),

      this.prisma.question.count({
        where: {
          ...(isAdmin ? {} : { ownerId: userId }),
          ...categoryFilterQuery,
          OR: [
            {
              question: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              rightAnswers: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
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
