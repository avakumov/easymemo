import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegularTasksService } from './regular-tasks.service';
import { CreateRegularTaskDto } from './dto/create-regular-task.dto';
import { UpdateRegularTaskDto } from './dto/update-regular-task.dto';

@Controller('regular-tasks')
export class RegularTasksController {
  constructor(private readonly regularTasksService: RegularTasksService) {}

  @Post()
  create(@Body() createRegularTaskDto: CreateRegularTaskDto) {
    return this.regularTasksService.create(createRegularTaskDto);
  }

  @Get()
  findAll() {
    return this.regularTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regularTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegularTaskDto: UpdateRegularTaskDto) {
    return this.regularTasksService.update(+id, updateRegularTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regularTasksService.remove(+id);
  }
}
