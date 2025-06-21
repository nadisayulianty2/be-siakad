import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendConfirmationEmail(email: string): Promise<void> {
    console.log(`Mulai mengirim email ke ${email}`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // simulasi delay 3 detik
    console.log(`Email berhasil dikirim ke ${email}`);
  }
}
