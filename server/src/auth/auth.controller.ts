import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserAndDescription } from 'src/user/dto/create-user-and-description.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

interface RequestWithUser extends Request {
    user: any;
}

@ApiTags('Авторизация')
@Controller('a')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация' })
    @ApiResponse({ status: 200, type: CreateUserDto })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 200, type: CreateUserDto })
    @Post('/registration')
    registration(@Body() dto: CreateUserAndDescription) {
        return this.authService.registrationWithDescription(dto);
    }

    @ApiOperation({ summary: 'Проверка авторизации' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Get('/check')
    checkAuth(@Req() req: RequestWithUser) {
        return this.authService.checkAuth(req.user);
    }

    @Post('/edit')
    editUser(@Body() dto: EditUserDto) {
        console.log(dto);
        return this.authService.editUser(dto);
    }
}
