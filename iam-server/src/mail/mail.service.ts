import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMailAsHtml(to: string, subject: string, html: string) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            html: html,
        };

        await this.mailerService.sendMail(mailOptions);
    }

    async sendMailAsText(to: string, subject: string, text: string) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            text,
        };

        await this.mailerService.sendMail(mailOptions);
    }

    async sendOtpCode(email: string, otpCode: string): Promise<void> {
        // const subject = 'Ваш код';
        // const text = `Ваш код: ${otpCode}`;
        // console.log(email, subject, text);
        // await this.sendMail(email, subject, text);

        const subject = 'Ваш код';

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Ваш код</h2>
            <p style="font-size: 16px; color: #555;">Здравствуйте!</p>
            <p style="font-size: 18px; font-weight: bold; color: #0084ff;">${otpCode}</p>
            <p style="font-size: 16px; color: #555;">Пожалуйста, введите этот код для подтверждения вашей идентификации.</p>
            <p style="font-size: 14px; color: #777;">Обратите внимание: код действителен в течение 10 минут.</p>
            <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
                <p>С уважением,<br>Ваша команда</p>
            </footer>
        </div>
    `;

        console.log(email, subject, htmlContent);
        await this.sendMailAsHtml(email, subject, htmlContent); // Обязательно передавайте html вместо text
    }
}
