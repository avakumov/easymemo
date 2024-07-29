import { Test, TestingModule } from '@nestjs/testing';
import { MicroTasksService } from './micro-tasks.service';

describe('MicroTasksService', () => {
  let service: MicroTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroTasksService],
    }).compile();

    service = module.get<MicroTasksService>(MicroTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
