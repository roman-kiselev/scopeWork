import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { login: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    }
    if (user instanceof User) {
      // Сравниваем пароли
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
    }

    throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  }

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.checkEmail(userDto.email);
      // Проверяем есть ли в БД такой логин
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Если нет хэшируем пароль
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      // Создаём пользователя
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      // Создаём токен для пользователя
      if (user instanceof User) {
        return this.generateToken(user);
      }
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(
        e.message || 'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registrationAdmin(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.checkEmail(userDto.email);
      // Проверяем есть ли в БД такой логин
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Если нет хэшируем пароль
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      // Создаём пользователя
      const user = await this.userService.createAdmin({
        ...userDto,
        password: hashPassword,
      });
      // Создаём токен для пользователя
      if (user instanceof User) {
        return this.generateToken(user);
      }
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(
        e.message || 'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async checkAuth(user: User) {
    try {
      const token = this.generateToken(user);
      return token;
    } catch (e) {
      throw new HttpException(
        e.message || 'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
