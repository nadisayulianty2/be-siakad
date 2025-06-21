import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body('email') email: string) {
    this.emailService.sendConfirmationEmail(email); // tidak di-await (biar async berjalan di background)
    return { message: `Permintaan pengiriman email diterima untuk ${email}` };
  }
}
