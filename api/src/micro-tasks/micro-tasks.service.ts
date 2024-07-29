import { Injectable } from '@nestjs/common';
import { CreateMicroTaskDto } from './dto/create-micro-task.dto';
import { UpdateMicroTaskDto } from './dto/update-micro-task.dto';

@Injectable()
export class MicroTasksService {
  create(createMicroTaskDto: CreateMicroTaskDto) {
    return 'This action adds a new microTask';
  }

  findAll() {
    return `This action returns all microTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} microTask`;
  }

  update(id: number, updateMicroTaskDto: UpdateMicroTaskDto) {
    return `This action updates a #${id} microTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} microTask`;
  }
}
