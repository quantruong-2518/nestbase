import { Test, TestingModule } from '@nestjs/testing';
import { ChapService } from './chap.service';

describe('ChapService', () => {
  let service: ChapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapService],
    }).compile();

    service = module.get<ChapService>(ChapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
