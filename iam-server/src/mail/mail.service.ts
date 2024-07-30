import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InviteTokensService } from 'src/invite-tokens/invite-tokens.service';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly inviteTokensService: InviteTokensService,
    ) {}

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

        await this.sendMailAsHtml(email, subject, htmlContent);
    }

    async sendInviteTokenAsHtml(email: string, token: string) {
        const subject = 'Приглашение в компанию';
        const link = `http://localhost:3000/invitation/${token}`;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Ваc приглашают в компанию</h2>
            <p style="font-size: 16px; color: #555;">Здравствуйте!</p>
            <p style="font-size: 18px; font-weight: bold; color: #0084ff;">${link}</p>
            <p style="font-size: 16px; color: #555;">Пожалуйста, перейдите по ссылке что бы зарегистрироваться в компанию.</p>
            <p style="font-size: 14px; color: #777;">Обратите внимание: ссылка действительна 24 часа.</p>
            <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
                <p>С уважением,<br>Ваша команда</p>
            </footer>
        </div>
    `;

        await this.sendMailAsHtml(email, subject, htmlContent);
    }

    async sendInviteToken(email: string, organizationId: number) {
        const inviteToken = await this.inviteTokensService.getTokenByEmail(
            email,
            organizationId,
        );

        await this.sendInviteTokenAsHtml(email, inviteToken.token);
    }

    async sendUpdatedInviteToken(email: string, organizationId: number) {
        const inviteToken = await this.inviteTokensService.getTokenByEmail(
            email,
            organizationId,
        );
        const updatedInviteToken = await this.inviteTokensService.updateToken(
            inviteToken.id,
            organizationId,
        );

        await this.sendInviteTokenAsHtml(email, updatedInviteToken.token);
    }

    async createAndSendInviteToken(email: string, organizationId: number) {
        const inviteToken = await this.inviteTokensService.create(
            { email },
            organizationId,
        );

        await this.sendInviteTokenAsHtml(email, inviteToken.token);
    }
}
