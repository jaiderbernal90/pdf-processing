import { Test, TestingModule } from '@nestjs/testing';
import { PdfEditService } from './pdf-edit.service';

describe('PdfEditService', () => {
  let service: PdfEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfEditService],
    }).compile();

    service = module.get<PdfEditService>(PdfEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
