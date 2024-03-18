import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsFilter } from 'src/types';
import { Public } from 'src/auth/decorators';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Post()
	create(@Body() question: CreateQuestionDto) {
		return this.questionsService.create(question);
	}

	@Public()
	@Post('/practice')
	async practice(@Body() body: { categories: string[]; count: number }) {
		return this.questionsService.practice(body);
	}

	@Public()
	@Post('/typing')
	async typing(@Body() body: { categories: string[]; count: number }) {
		return this.questionsService.typing(body);
	}

	@Public()
	@Post('/checkanswer')
	answer(@Body() body: { questionId: number; answer: string }) {
		return this.questionsService.checkAnswer(body);
	}

	@Public()
	@Post('/checkCurrentanswer')
	checkCurrentAnswer(@Body() body: { questionId: number; answer: string }) {
		return this.questionsService.checkCurrentAnswer(body);
	}

	@Public()
	@Post('/find')
	async find(
		@Body()
		body: {
			skip?: number;
			take?: number;
			search?: string;
			filter?: QuestionsFilter;
		}
	) {
		return this.questionsService.find(body);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.questionsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateQuestionDto: CreateQuestionDto) {
		return this.questionsService.update(+id, updateQuestionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.questionsService.remove(+id);
	}
}
