import { Controller, Post, Get, UseInterceptors, UploadedFile, Res, StreamableFile, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { PdfEditService } from './pdf-edit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/media.handle';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, writeFileSync } from 'fs';

@Controller('pdf-edit')
export class PdfEditController {
  constructor(private readonly pdfEditService: PdfEditService) {}
  
  @HttpCode(200)
  @Post('add-margins')
  @UseInterceptors(FileInterceptor('pdf', { storage }))
  async addMargins(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {

    try {
      const { filename, destination } = file;
      const modifiedPdfBytes = await this.pdfEditService.modifyPdfFile({ filename, destination });
      const buffer = Buffer.from(modifiedPdfBytes);
      const uuid = Date.now();
      const tempFilePath = `${destination}/${uuid}.pdf`;
      await writeFileSync(tempFilePath, buffer);

      //const fileStream = createReadStream(join(process.cwd(), tempFilePath));
      const fileStream = createReadStream(tempFilePath);
      fileStream.pipe(res);
      //await this.pdfEditService.emptyFolder('tmp');
      await this.pdfEditService.emptyFolder(destination);

    } catch (error) {
      console.error('Error al editar el PDF:', error);
      throw new HttpException(`Error al editar el PDF: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Get('add-margins')
  @UseInterceptors(FileInterceptor('pdf', { storage }))
  async test() {
    return "PRUEBAAA";
  }
}
