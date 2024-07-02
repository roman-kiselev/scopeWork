import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/guards/refresh-token/refresh-token-ids.storage';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig),
        UsersModule,
        OrganizationsModule,
    ],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AccessTokenGuard,
        RefreshTokenIdsStorage,
        AuthenticationService,
    ],
    controllers: [AuthenticationController],
    exports: [AuthenticationService, HashingService],
})
export class IamModule {}
