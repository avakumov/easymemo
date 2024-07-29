import { Test, TestingModule } from '@nestjs/testing';
import { MicroTasksController } from './micro-tasks.controller';
import { MicroTasksService } from './micro-tasks.service';

describe('MicroTasksController', () => {
  let controller: MicroTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicroTasksController],
      providers: [MicroTasksService],
    }).compile();

    controller = module.get<MicroTasksController>(MicroTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
