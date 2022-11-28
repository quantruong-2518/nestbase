import { Test, TestingModule } from '@nestjs/testing';
import { ChapResolver } from './chap.resolver';
import { ChapService } from './chap.service';

describe('ChapResolver', () => {
  let resolver: ChapResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapResolver, ChapService],
    }).compile();

    resolver = module.get<ChapResolver>(ChapResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
