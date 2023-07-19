import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from 'src/user/user.module';
import { UserDescriptionModule } from 'src/user-description/user-description.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserDescriptionModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret2',
      signOptions: { expiresIn: '10h' },
    }),
  ],
})
export class AuthModule {}
