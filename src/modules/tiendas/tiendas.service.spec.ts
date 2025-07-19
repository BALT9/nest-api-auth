import { Test, TestingModule } from '@nestjs/testing';
import { TiendasService } from './tiendas.service';

describe('TiendasService', () => {
  let service: TiendasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiendasService],
    }).compile();

    service = module.get<TiendasService>(TiendasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
