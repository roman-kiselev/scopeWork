import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
    controllers: [MailController],
    providers: [MailService],
    // imports: [
    //     MailerModule.forRoot({
    //         transport: {
    //             host: process.env.MAIL_HOST,
    //             port: Number(process.env.MAIL_PORT),
    //             secure: true,
    //             auth: {
    //                 user: process.env.MAIL_USERNAME,
    //                 pass: process.env.MAIL_PASSWORD,
    //             },
    //         },
    //     }),
    // ],
})
export class MailModule {}
