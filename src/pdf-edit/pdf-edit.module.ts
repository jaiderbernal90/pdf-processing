import { Module } from '@nestjs/common';
import { PdfEditService } from './pdf-edit.service';
import { PdfEditController } from './pdf-edit.controller';

@Module({
  controllers: [PdfEditController],
  providers: [PdfEditService],
})
export class PdfEditModule {}
