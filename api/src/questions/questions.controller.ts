import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Response } from "express";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() question: CreateQuestionDto) {
    return this.questionsService.create(question);
  }

  @Post("/practice")
  async practice(@Body() body: { categories: string[]; count: number }) {
    return this.questionsService.practice(body);
  }

  @Post("/checkanswer")
  answer(@Body() body: { questionId: number; answer: string }) {
    return this.questionsService.checkAnswer(body);
  }

  @Get()
  async findAll(@Query() query: { skip?: number; take?: number }) {
    return this.questionsService.findAll({
      skip: Number(query.skip),
      take: Number(query.take),
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateQuestionDto: CreateQuestionDto
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }
}
