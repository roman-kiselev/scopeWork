import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { TestDto } from './dto/test.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Отправка кода OTP на почту' })
    @Post('send-otp')
    async sendOtp(@Body() dto: TestDto): Promise<{ message: string }> {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Генерация случайного 6-значного кода

        await this.mailService.sendOtpCode(dto.email, otpCode);

        return { message: 'OTP код отправлен на вашу почту' };
    }
}
