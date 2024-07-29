import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicroTasksService } from './micro-tasks.service';
import { CreateMicroTaskDto } from './dto/create-micro-task.dto';
import { UpdateMicroTaskDto } from './dto/update-micro-task.dto';

@Controller('micro-tasks')
export class MicroTasksController {
  constructor(private readonly microTasksService: MicroTasksService) {}

  @Post()
  create(@Body() createMicroTaskDto: CreateMicroTaskDto) {
    return this.microTasksService.create(createMicroTaskDto);
  }

  @Get()
  findAll() {
    return this.microTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicroTaskDto: UpdateMicroTaskDto) {
    return this.microTasksService.update(+id, updateMicroTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microTasksService.remove(+id);
  }
}
