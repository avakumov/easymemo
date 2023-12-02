import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  answer: string;
  @IsNotEmpty()
  ownerId: number;
  categories: number[];
  id: number;
}
