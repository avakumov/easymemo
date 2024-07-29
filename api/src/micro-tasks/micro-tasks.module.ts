import { Module } from '@nestjs/common';
import { MicroTasksService } from './micro-tasks.service';
import { MicroTasksController } from './micro-tasks.controller';

@Module({
  controllers: [MicroTasksController],
  providers: [MicroTasksService]
})
export class MicroTasksModule {}
