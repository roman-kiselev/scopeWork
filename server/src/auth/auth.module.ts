import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret2',
      signOptions: { expiresIn: '10h' },
    }),
  ],
})
export class AuthModule {}
