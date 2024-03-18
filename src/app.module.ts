import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfEditController } from './pdf-edit/pdf-edit.controller';
import { PdfEditService } from './pdf-edit/pdf-edit.service';
import { PdfEditModule } from './pdf-edit/pdf-edit.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public" )
    }),
    PdfEditModule
  ],
  controllers: [AppController, PdfEditController],
  providers: [AppService, PdfEditService],
})
export class AppModule {}
