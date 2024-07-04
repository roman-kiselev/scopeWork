import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import jwtConfig from '../config/jwt.config';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorators';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpWithOrganizationDto } from './dto/sign-up-with-organization.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';
import { TokensResponse } from './responses/tokens.response';

@ApiTags('Authentication')
@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @ApiOperation({
        summary: 'Регистрация пользователя',
        description: 'Добавить описание когда будет готова дальнейшая логика',
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Информация о том что пользователь зарегистрирован',
        type: String,
    })
    @ApiConflictResponse({
        description: 'Информация о том что пользователь уже существует',
    })
    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        //return this.authenticationService.signUp(signUpDto);
    }

    @ApiOperation({
        summary: 'Регистрация организации',
        description: 'Добавить описание когда будет готова дальнейшая логика',
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Информация о том что организация зарегистрирована',
        type: String,
    })
    @ApiConflictResponse({
        description: 'Информация о том что организация уже существует',
    })
    @Post('sign-up/organization')
    signUpOrganization(@Body() signUpDto: SignUpWithOrganizationDto) {
        return this.authenticationService.signUpWithOrganization(signUpDto);
    }

    @ApiOperation({
        summary: 'Вход',
        description: 'Добавить описание когда будет готова дальнейшая логика',
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Access и refresh токены',
        type: TokensResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
        const result = await this.authenticationService.signIn(signInDto);

        res.cookie('refreshToken', result.refreshToken, {
            maxAge: +jwtConfig().refreshTtl, // 30 days
            httpOnly: true,
            // secure: true, // TODO: Потребуется ли включение в production ?
        });
        return res.json(result);
    }

    @ApiOperation({
        summary: 'Рефреш токенов',
        description: 'Добавить описание когда будет готова дальнейшая логика',
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Access и refresh токены',
        type: TokensResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    @ApiBearerAuth()
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const rt = req.cookies['refreshToken'];
        console.log(rt.cookies);
        const result = await this.authenticationService.refreshTokens({
            refreshToken: rt,
        });

        res.cookie('refreshToken', result.refreshToken, {
            maxAge: +jwtConfig().refreshTtl, // 30 days
            httpOnly: true,
            // secure: true, // TODO: Потребуется ли включение в production ?
        });

        //console.log({ accessToken: result.accessToken });
        return res.json({ accessToken: result.accessToken });
    }
}
