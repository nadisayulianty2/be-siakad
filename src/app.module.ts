import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { Mahasiswa } from './mahasiswa/entities/mahasiswa.entity';
import { MataKuliah } from './mata-kuliah/entities/mata-kuliah.entity';
import { MataKuliahModule } from './mata-kuliah/mata-kuliah.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Mahasiswa, MataKuliah],
      synchronize: true,
    }),
    MahasiswaModule,
    MataKuliahModule,
  ],
})
export class AppModule {}
