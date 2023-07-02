import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto) {
    return "This action adds a new question";
  }

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
