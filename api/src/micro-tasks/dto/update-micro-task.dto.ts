import { PartialType } from '@nestjs/swagger';
import { CreateMicroTaskDto } from './create-micro-task.dto';

export class UpdateMicroTaskDto extends PartialType(CreateMicroTaskDto) {}
