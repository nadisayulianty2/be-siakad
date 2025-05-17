import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';

@Module({
  imports: [MahasiswaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
