import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mata_kuliah')
export class MataKuliah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode: string;

  @Column()
  nama: string;

  @Column({ type: 'int' })
  sks: number;

  @Column()
  semester: string;

  @Column()
  jurusan: string;
}
