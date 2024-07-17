import {
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { RoleName } from 'src/roles/enums/RoleName';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenData } from '../interfaces/refresh-token-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpWithOrganizationDto } from './dto/sign-up-with-organization.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token.error';
import { RefreshTokenIdsStorage } from './guards/refresh-token/refresh-token-ids.storage';

@Injectable()
export class AuthenticationService {
    constructor(
        private organizationService: OrganizationsService,
        private userService: UsersService,
        private hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    ) {}

    private async signToken<T>(userId: number, expiresIn: string, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                expiresIn,
            },
        );
    }

    private async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTtl,
                {
                    email: user.email,
                    roles: user.roles.map((role) => role.name),
                    banned: user.banned,
                    organizationId: user.organization.id,
                },
            ),
            this.signToken<Partial<RefreshTokenData>>(
                user.id,
                this.jwtConfiguration.refreshTtl,
                {
                    refreshTokenId,
                },
            ),
        ]);

        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return { accessToken, refreshToken };
    }

    async signUp(dto: SignUpDto) {
        const user = await this.userService.findOneBy({ email: dto.email });
        if (user) {
            throw new ConflictException(
                `User with email ${dto.email} already exists`,
            );
        }
        const hashPassword = await this.hashingService.hash(dto.password);
        const candidate = await this.userService.createUser({
            ...dto,
            password: hashPassword,
        });
        if (!candidate) {
            throw new ConflictException('User not created');
        }

        return candidate;
    }

    async signUpWithOrganization(dto: SignUpWithOrganizationDto) {
        const user = await this.userService.checkUniqueEmail(dto.email);
        if (user) {
            throw new ConflictException(
                `User with email ${dto.email} already exists`,
            );
        }

        const organization = await this.organizationService.create({
            name: dto.nameOrganization,
            address: dto.addressOrganization,
        });

        const hashPassword = await this.hashingService.hash(dto.password);
        const candidate = await this.userService.createUser({
            email: dto.email,
            password: hashPassword,
            role: RoleName.ADMIN,
            organizationId: organization.id,
        });
        if (!candidate) {
            throw new ConflictException('User not created');
        }

        return candidate;
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneWithRelation(
            { email: dto.email },
            ['organization', 'roles'],
        );

        if (user instanceof User) {
            if (user.banned === true) {
                throw new ForbiddenException('User is banned');
            }

            const isEqual = await this.hashingService.compare(
                dto.password,
                user.password,
            );

            if (!isEqual) {
                throw new ForbiddenException('Password or email is incorrect');
            }

            const result = await this.generateTokens(user);

            return result;
        }
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub, refreshTokenId } =
                await this.jwtService.verifyAsync<RefreshTokenData>(
                    refreshTokenDto.refreshToken,
                    {
                        secret: this.jwtConfiguration.secret,
                        audience: this.jwtConfiguration.audience,
                        issuer: this.jwtConfiguration.issuer,
                    },
                );

            const user = await this.userService.findOneWithRelation(
                { id: sub },
                ['roles', 'organization'],
            );

            if (user instanceof User) {
                const isValid = await this.refreshTokenIdsStorage.validate(
                    user.id,
                    refreshTokenId,
                );

                if (isValid) {
                    await this.refreshTokenIdsStorage.invalidate(user.id);
                } else {
                    throw new ConflictException('Refresh token is invalid');
                }

                return this.generateTokens(user);
            }
        } catch (error) {
            if (error instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access denied');
            }

            throw new UnauthorizedException();
        }
    }

    async verifyToken(token: string) {
        const result = await this.jwtService.verifyAsync(token, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
        });

        if (result) {
            return token;
        }
        return null;
    }

    async getRoles(accessToken: string) {
        try {
            const result: ActiveUserData = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                },
            );

            return result.roles;
        } catch (e) {
            throw new UnauthorizedException('Not authorized');
        }
    }

    async getUser(accessToken: string) {
        try {
            const result: ActiveUserData = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                },
            );

            return result;
        } catch (e) {
            throw new UnauthorizedException('Not authorized');
        }
    }

    // async recovery(email: string) {
    //     const user = await this.userService.findOneBy({email});
    //     if (!user) {
    //       throw new NotFoundException(`User not found with email: ${email}`);
    //     }

    //     const newPassword = this.passwordService.generateString();

    //     await this.userService.updatePassword(
    //       user.id,
    //       await this.hashingService.hash(newPassword),
    //     );

    //     await this.mailService.sendEmail({
    //       to: user.email,
    //       subject: 'Password Recovery for ANT',
    //       text: `New password: ${newPassword}`,
    //     });
    //   }
}
