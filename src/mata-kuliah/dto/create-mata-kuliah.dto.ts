import { IsString, IsNumber, IsNotEmpty, Min, Matches } from 'class-validator';

export class CreateMataKuliahDto {
  @IsNotEmpty({ message: 'Kode mata kuliah wajib diisi' })
  @IsString({ message: 'Kode mata kuliah harus berupa teks' })
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message:
      'Kode hanya boleh berisi huruf, angka, dash (-), dan underscore (_), tanpa spasi',
  })
  kode: string;

  @IsNotEmpty({ message: 'Nama mata kuliah wajib diisi' })
  @IsString({ message: 'Nama mata kuliah harus berupa teks' })
  nama: string;

  @IsNumber({}, { message: 'SKS harus berupa angka' })
  @Min(1, { message: 'SKS minimal 1' })
  sks: number;

  @IsNotEmpty({ message: 'Semester wajib diisi' })
  @IsString({ message: 'Semester harus berupa teks' })
  semester: string;

  @IsNotEmpty({ message: 'Jurusan wajib diisi' })
  @IsString({ message: 'Jurusan harus berupa teks' })
  jurusan: string;
}
