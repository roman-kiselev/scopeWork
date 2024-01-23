import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/roles/roles.model';
import { UserDescription } from 'src/user-description/user-description.model';
import { UserDescriptionService } from 'src/user-description/user-description.service';
import { CreateUserAndDescription } from 'src/user/dto/create-user-and-description.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private userService: UserService,
    private userDescriptionService: UserDescriptionService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      banned: user.banned,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);

    if (user.banned) {
      throw new UnauthorizedException({ message: 'У вас нет доступа' });
    }

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

  async registrationWithDescription(dto: CreateUserAndDescription) {
    try {
      const { firstname, lastname, email, password } = dto;
      const candidate = await this.userService.checkEmail(email);
      // Проверяем есть ли в БД такой логин
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Если нет хэшируем пароль
      const hashPassword = await bcrypt.hash(password, 5);
      // Создаём пользователя
      const user = await this.userService.createUser({
        ...dto,
        password: hashPassword,
      });
      const findUser = await this.userService.findUserByEmail(email);
      const description = await this.userDescriptionService.create({
        firstname,
        lastname,
        userId: findUser.id,
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

  async registrationAdminWithDescription(dto: CreateUserAndDescription) {
    try {
      const { firstname, lastname, email, password } = dto;
      const candidate = await this.userService.checkEmail(email);
      // Проверяем есть ли в БД такой логин
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Если нет хэшируем пароль
      const hashPassword = await bcrypt.hash(password, 5);
      // Создаём пользователя
      const user = await this.userService.createAdmin({
        ...dto,
        password: hashPassword,
      });
      const findUser = await this.userService.findUserByEmail(email);
      const description = await this.userDescriptionService.create({
        firstname,
        lastname,
        userId: findUser.id,
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

  async editUser(dto: EditUserDto) {
    try {
      const { userId, firstname, lastname, email, banned } = dto;
      const user = await this.userRepository.findByPk(userId);

      user.email = email;
      if (dto.password) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        user.password = dto.password ? hashPassword : user.password;
      }

      user.banned = banned;
      user.save();

      const userDesc = await this.userDescriptionService.edit(
        userId,
        firstname,
        lastname,
      );

      const finishUser = await this.userRepository.findByPk(userId, {
        include: [
          {
            model: UserDescription,
          },
          {
            model: Roles,
            through: {
              attributes: [],
            },
          },
        ],
      });

      return finishUser;
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
}
