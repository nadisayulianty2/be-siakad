import { Module } from '@nestjs/common';
import { MataKuliahService } from './mata-kuliah.service';
import { MataKuliahController } from './mata-kuliah.controller';
import { MataKuliah } from './entities/mata-kuliah.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MataKuliah])],
  controllers: [MataKuliahController],
  providers: [MataKuliahService],
})
export class MataKuliahModule {}
