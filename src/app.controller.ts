import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MailerService } from "./services/mailer/mailer.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("send-mail")
  async sendMail() {
    const to = "rahul.anawall@gmail.com";
    const subject = "Hello from dailystore Holidays";
    const htmlContent = "<h1>Welcome to dailystore Holidays</h1>";

    await this.mailerService.sendEmail(to, subject, htmlContent);
    return "Email sent";
  }
}
