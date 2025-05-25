import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { MataKuliahService } from './mata-kuliah.service';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

@Controller('mata-kuliah')
export class MataKuliahController {
  constructor(private readonly service: MataKuliahService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    const matkul = this.service.findOne(kode);
    if (!matkul) {
      throw new NotFoundException(
        `Mata kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return matkul;
  }

  @Post()
  create(@Body() dto: CreateMataKuliahDto) {
    try {
      return this.service.create(dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Gagal menambahkan mata kuliah');
    }
  }

  @Put(':kode')
  update(@Param('kode') kode: string, @Body() dto: UpdateMataKuliahDto) {
    try {
      const updated = this.service.update(kode, dto);
      if (!updated) {
        throw new NotFoundException(
          `Mata kuliah dengan kode ${kode} tidak ditemukan`,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Gagal mengupdate mata kuliah');
    }
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    const deleted = this.service.remove(kode);
    if (!deleted) {
      throw new NotFoundException(
        `Mata kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return deleted;
  }
}
