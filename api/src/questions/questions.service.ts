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

  async practice(query: { [index: string]: string }) {
    const categories = query?.categories?.split(",");
    const count = query?.count;

    const groupedQuestions = await getQuestionsWithFilter.call(
      this,
      categories
    );

    return getRandom([].concat(...groupedQuestions), count);

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
