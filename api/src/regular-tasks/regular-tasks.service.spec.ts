import { Test, TestingModule } from '@nestjs/testing';
import { RegularTasksService } from './regular-tasks.service';

describe('RegularTasksService', () => {
  let service: RegularTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularTasksService],
    }).compile();

    service = module.get<RegularTasksService>(RegularTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
