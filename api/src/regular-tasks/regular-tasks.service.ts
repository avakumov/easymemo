import { Injectable } from '@nestjs/common';
import { CreateRegularTaskDto } from './dto/create-regular-task.dto';
import { UpdateRegularTaskDto } from './dto/update-regular-task.dto';

@Injectable()
export class RegularTasksService {
  create(createRegularTaskDto: CreateRegularTaskDto) {
    return 'This action adds a new regularTask';
  }

  findAll() {
    return `This action returns all regularTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} regularTask`;
  }

  update(id: number, updateRegularTaskDto: UpdateRegularTaskDto) {
    return `This action updates a #${id} regularTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} regularTask`;
  }
}
