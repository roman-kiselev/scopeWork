import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDescriptionModule } from 'src/user-description/user-description.module';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => UserModule),
    UserDescriptionModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret2',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
