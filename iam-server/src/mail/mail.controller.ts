import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { RolesGuard } from 'src/iam/authorization/guards/roles/roles.guard';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { RoleName } from 'src/roles/enums/RoleName';
import { EmailDto } from './dto/email.dto';
import { MailService } from './mail.service';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Отправка кода OTP на почту' })
    @Post('send-otp')
    async sendOtp(@Body() dto: EmailDto): Promise<{ message: string }> {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Генерация случайного 6-значного кода

        await this.mailService.sendOtpCode(dto.email, otpCode);

        return { message: 'OTP код отправлен на вашу почту' };
    }

    @ApiBearerAuth()
    @Roles(RoleName.ADMIN)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Отправка токена приглашения на почту' })
    @Post('send-invite-token')
    sendInviteToken(@Body() dto: EmailDto, @ActiveUser() user: ActiveUserData) {
        this.mailService.sendInviteToken(dto.email, user.organizationId);
    }

    @ApiBearerAuth()
    @Roles(RoleName.ADMIN)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Создать и отправить токен приглашения на почту' })
    @Post('create-send-invite-token')
    createAndSendInviteToken(
        @Body() dto: EmailDto,
        @ActiveUser() user: ActiveUserData,
    ) {
        this.mailService.createAndSendInviteToken(
            dto.email,
            user.organizationId,
        );
    }

    @ApiBearerAuth()
    @Roles(RoleName.ADMIN)
    @UseGuards(RolesGuard)
    @ApiOperation({
        summary: 'Обновить и отправить токен приглашения на почту',
    })
    @Post('send-updated-invite-token')
    sendUpdatedInviteToken(
        @Body() dto: EmailDto,
        @ActiveUser() user: ActiveUserData,
    ) {
        this.mailService.sendUpdatedInviteToken(dto.email, user.organizationId);
    }
}
