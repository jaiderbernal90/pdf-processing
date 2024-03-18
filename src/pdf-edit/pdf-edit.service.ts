import { Injectable } from '@nestjs/common';
import { CreatePdfEditDto } from './dto/create-pdf-edit.dto';
import { UpdatePdfEditDto } from './dto/update-pdf-edit.dto';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';
import { join } from 'path';
import { readdir, unlink } from 'fs/promises';

@Injectable()
export class PdfEditService {

  public async modifyPdfFile(file: any): Promise<Uint8Array> {
    try {
      const existingPdfBytes = await this.loadExistingPdfFile(file);
      return await this.modifyPdf(existingPdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
      throw error;
    }
  }

  public async emptyFolder(folderPath: string): Promise<void> {
    try {
      const files = await readdir(folderPath);
      if(!files) return 
      await Promise.all(files.map(async (file) => {
        const filePath = join(folderPath, file);
        await unlink(filePath);
      }));

      console.log(`Carpeta "${folderPath}" vaciada correctamente.`);
    } catch (error) {
      console.error(`Error al vaciar la carpeta "${folderPath}":`, error);
      throw error;
    }
  }

  private async loadExistingPdfFile(file: any): Promise<Uint8Array> {
    const { destination, filename } = file;
    //const existingPdfPath = join(process.cwd(), `${destination}/${filename}`);
    const existingPdfPath = `${destination}/${filename}`;
    return readFileSync(existingPdfPath);
  }
  
  private async modifyPdf(existingPdfBytes: Uint8Array): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const margin = 100;
  
    for (const page of pages) {
      const { x, y, width, height } = page.getMediaBox();
      const { x: xCrop, y: yCrop} = page.getCropBox();
  
      page.setCropBox(xCrop, yCrop - margin, width, height + margin * 2);
      page.setMediaBox(x, y - margin, width, height + margin * 2);
    }
  
    return await pdfDoc.save();
  }
}
