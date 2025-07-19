import { Test, TestingModule } from '@nestjs/testing';
import { TiendasController } from './tiendas.controller';
import { TiendasService } from './tiendas.service';

describe('TiendasController', () => {
  let controller: TiendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendasController],
      providers: [TiendasService],
    }).compile();

    controller = module.get<TiendasController>(TiendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
