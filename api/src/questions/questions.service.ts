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
        answer: q.answer,
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
      const correctAnswer = question.answer;
      const isCorrect = answer.trim() === correctAnswer.trim();
      const status = isCorrect ? "success" : "fail";

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

      return { status, answer: correctAnswer };
    }
  }

  async practice(query: { [index: string]: string }) {
    const categories = query?.categories?.split(",");
    const count = query?.count;

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
    function getRandom(arr: any[], count: string) {
      const res = [];
      let parsedCount = parseInt(count);
      if (Array.isArray(arr) && !isNaN(parsedCount)) {
        let len = arr.length;
        if (len < parsedCount) {
          parsedCount = len;
        }
        for (let i = 0; i < parsedCount; i++) {
          len = arr.length;
          const randomIndex = Math.floor(Math.random() * len);
          res.push(arr.splice(randomIndex, 1)[0]);
        }
      }
      return res;
    }

    function filterById(arr: { id: number }[]) {
      const withoutDublicates = [];
      const ids: number[] = [];
      arr.forEach((q) => {
        const findedId = ids.find((id) => id === q.id);
        if (!findedId) {
          withoutDublicates.push(q);
          ids.push(q.id);
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
        answer: q.answer,
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
