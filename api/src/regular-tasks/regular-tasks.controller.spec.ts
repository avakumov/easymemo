import { Test, TestingModule } from '@nestjs/testing';
import { RegularTasksController } from './regular-tasks.controller';
import { RegularTasksService } from './regular-tasks.service';

describe('RegularTasksController', () => {
  let controller: RegularTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegularTasksController],
      providers: [RegularTasksService],
    }).compile();

    controller = module.get<RegularTasksController>(RegularTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
