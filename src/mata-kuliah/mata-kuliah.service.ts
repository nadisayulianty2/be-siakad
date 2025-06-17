import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MataKuliah } from './entities/mata-kuliah.entity';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

@Injectable()
export class MataKuliahService {
  constructor(
    @InjectRepository(MataKuliah)
    private readonly mataKuliahRepo: Repository<MataKuliah>,
  ) {}

  async create(dto: CreateMataKuliahDto): Promise<MataKuliah> {
    const existing = await this.mataKuliahRepo.findOne({
      where: { kode: dto.kode },
    });
    if (existing) {
      throw new BadRequestException('Kode mata kuliah sudah digunakan');
    }

    const newMatkul = this.mataKuliahRepo.create(dto); // otomatis isi entity
    return await this.mataKuliahRepo.save(newMatkul);
  }

  async findAll(): Promise<MataKuliah[]> {
    return await this.mataKuliahRepo.find();
  }

  async findOne(kode: string): Promise<MataKuliah> {
    const data = await this.mataKuliahRepo.findOne({ where: { kode } });
    if (!data) throw new NotFoundException('Mata kuliah tidak ditemukan');
    return data;
  }

  async update(kode: string, dto: UpdateMataKuliahDto): Promise<MataKuliah> {
    const matkul = await this.findOne(kode);

    // Jika mengganti kode, cek apakah kode baru sudah dipakai
    if (dto.kode && dto.kode !== kode) {
      const cek = await this.mataKuliahRepo.findOne({
        where: { kode: dto.kode },
      });
      if (cek) {
        throw new BadRequestException(
          `Kode mata kuliah "${dto.kode}" sudah digunakan`,
        );
      }
    }

    const updated = this.mataKuliahRepo.merge(matkul, dto); // update sebagian
    return await this.mataKuliahRepo.save(updated);
  }

  async remove(kode: string): Promise<MataKuliah> {
    const data = await this.findOne(kode);
    await this.mataKuliahRepo.remove(data);
    return data;
  }
}
