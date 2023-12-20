import { Injectable, Scope, Inject } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { REQUEST } from "@nestjs/core";
import { RequestExtended } from "src/entities/request";

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
        correctAnswers: q.correctAnswers.map((q) => q.trim()),
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
      const correctAnswers = question.correctAnswers;
      let isCorrect = false;
      for (const correctAnswer of correctAnswers) {
        if (answer.trim() === correctAnswer.trim()) {
          isCorrect = true;
          break;
        }
      }
      const status = isCorrect ? "success" : "fail";

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

      return { status, correctAnswers };
    }
  }

  async practice({
    categories,
    count,
  }: {
    categories: string[];
    count: number;
  }) {
    const groupedQuestions = await getQuestionsWithFilter.call(
      this,
      categories
    );

    /*приводим к одноменому массиву*/
    const questions = [].concat(...groupedQuestions);

    //TODO refactor this for best performance
    /*удаляем  дубликаты*/
    const questionsWithoutDublicates = filterById(questions);

    /*удаляем правильные ответы*/
    questionsWithoutDublicates.forEach((q) => {
      delete q.answer;
    });

    //TODO refactor this for best performance
    /*выбираем необходимое количество*/
    return getRandom(questionsWithoutDublicates, count);

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

    function filterById(arr: { id: number }[]) {
      const withoutDublicates = [];
      arr.forEach((q) => {
        const findedId = withoutDublicates.find((e) => e.id === q.id);
        if (!findedId) {
          withoutDublicates.push(q);
        }
      });
      return withoutDublicates;
    }

    async function getQuestionsWithFilter(categories: string[]) {
      const { userId, isAdmin } = this.request.user;
      if (Array.isArray(categories) && categories.length !== 0) {
        return Promise.all(
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
      } else {
        return [];
      }
    }
  }

  async findAll() {
    const { userId, isAdmin } = this.request.user;
    return this.prisma.question.findMany({
      where: {
        ...(isAdmin ? {} : { ownerId: userId }),
      },
      include: {
        categories: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  update(id: number, q: CreateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: {
        question: q.question,
        correctAnswers: q.correctAnswers.map((q) => q.trim()),
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
