import { Module } from '@nestjs/common';
import { InviteTokensModule } from 'src/invite-tokens/invite-tokens.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
    controllers: [MailController],
    providers: [MailService],
    imports: [InviteTokensModule],
    exports: [MailService],
})
export class MailModule {}
