import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    service = new EmailService();
  });

  it('should log sending and success messages', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    await service.sendRegistrationEmail('dita@student.ac.id', 'Dita');

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Mengirim email'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Email ke dita@student.ac.id berhasil dikirim'),
    );

    logSpy.mockRestore();
  });
});
