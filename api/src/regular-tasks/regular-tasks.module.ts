import { Module } from '@nestjs/common';
import { RegularTasksService } from './regular-tasks.service';
import { RegularTasksController } from './regular-tasks.controller';

@Module({
  controllers: [RegularTasksController],
  providers: [RegularTasksService]
})
export class RegularTasksModule {}
