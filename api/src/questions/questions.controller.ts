import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
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

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.questionsService.findAll();
    const count = data.length.toString();
    res.append("X-Total-Count", count);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
    res.json(data);
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
