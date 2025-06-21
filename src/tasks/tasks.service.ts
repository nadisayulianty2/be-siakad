import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Cron job berjalan setiap 10 detik');
  }

  @Interval(5000) // setiap 5 detik
  handleInterval() {
    this.logger.log('Interval berjalan');
  }

  @Timeout(10000) // setelah 10 detik
  handleTimeout() {
    this.logger.log('Timeout setelah 10 detik');
  }

}
