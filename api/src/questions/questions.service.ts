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

  findAll() {
    const { userId, isAdmin } = this.request.user;
    const where = isAdmin ? null : { where: { ownerId: userId } };

    return this.prisma.question.findMany({
      ...where,
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
