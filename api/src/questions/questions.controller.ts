import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Response } from "express";
import { RequestExtended } from "src/entities/request";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() question: CreateQuestionDto, @Req() request: RequestExtended) {
    const userId = request.user.userId;
    question.ownerId = userId;
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
