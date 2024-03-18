import { Test, TestingModule } from '@nestjs/testing';
import { PdfEditController } from './pdf-edit.controller';
import { PdfEditService } from './pdf-edit.service';

describe('PdfEditController', () => {
  let controller: PdfEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfEditController],
      providers: [PdfEditService],
    }).compile();

    controller = module.get<PdfEditController>(PdfEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
