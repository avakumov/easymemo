import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  rightAnswers: string;
  ownerId: number;
  categories: number[];
  id: number;
}
