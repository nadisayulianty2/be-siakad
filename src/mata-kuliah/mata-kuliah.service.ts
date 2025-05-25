import { BadRequestException, Injectable } from '@nestjs/common';
import { MataKuliah } from './entities/mata-kuliah.entity';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

@Injectable()
export class MataKuliahService {
  private data: MataKuliah[] = [];

  create(dto: CreateMataKuliahDto) {
    const existing = this.data.find((m) => m.kode === dto.kode);
    if (existing) {
      throw new BadRequestException('Kode mata kuliah sudah digunakan');
    }

    const newMatkul = new MataKuliah(
      dto.kode,
      dto.nama,
      dto.sks,
      dto.semester,
      dto.jurusan,
    );
    this.data.push(newMatkul);
    return newMatkul;
  }

  findAll() {
    return this.data;
  }

  findOne(kode: string): MataKuliah | undefined {
    return this.data.find((m) => m.kode === kode);
  }

  update(kode: string, dto: UpdateMataKuliahDto): MataKuliah | null {
    if (!dto.nama || !dto.sks || !dto.jurusan || !dto.semester) {
      throw new Error('Semua field wajib diisi untuk update');
    }

    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;

    if (dto.kode && dto.kode !== kode) {
      const kodeSudahDipakai = this.data.some((m) => m.kode === dto.kode);
      if (kodeSudahDipakai) {
        throw new Error(`Kode mata kuliah "${dto.kode}" sudah digunakan`);
      }
    }

    const updated = new MataKuliah(
      dto.kode ?? kode,
      dto.nama,
      dto.sks,
      dto.semester,
      dto.jurusan,
    );
    this.data[index] = updated;
    return updated;
  }

  remove(kode: string): MataKuliah | null {
    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;
    const deleted = this.data[index];
    this.data.splice(index, 1);
    return deleted;
  }
}
