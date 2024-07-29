import { PartialType } from '@nestjs/swagger';
import { CreateRegularTaskDto } from './create-regular-task.dto';

export class UpdateRegularTaskDto extends PartialType(CreateRegularTaskDto) {}
