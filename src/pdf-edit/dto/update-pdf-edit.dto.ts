import { PartialType } from '@nestjs/mapped-types';
import { CreatePdfEditDto } from './create-pdf-edit.dto';

export class UpdatePdfEditDto extends PartialType(CreatePdfEditDto) {}
