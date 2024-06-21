import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import * as Joi from 'joi';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { IamModule } from './iam/iam.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RolesModule } from './roles/roles.module';
import { UserDescriptionModule } from './user-description/user-description.module';

type DBName = 'postgres';
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_ACCESS_TTL: Joi.string().required(),
                JWT_REFRESH_TTL: Joi.string().required(),
                JWT_ISSUER: Joi.string().required(),
                JWT_AUDIENCE: Joi.string().required(),

                DB_TYPE: Joi.string().valid('postgres', 'mysql'),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().integer().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),

                REDIS_HOST: Joi.string().required(),
                REDIS_PORT: Joi.number().integer().required(),

                THROTTLE_TTL_SECONDS: Joi.number().integer().required(),
                THROTTLE_LIMIT: Joi.number().integer().required(),
            }),
        }),
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as DBName,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [],
            autoLoadEntities: true,
            synchronize: true,
        }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: seconds(Number(process.env.THROTTLE_TTL_SECONDS)),
                    limit: Number(process.env.THROTTLE_LIMIT),
                },
            ],

            storage: new ThrottlerStorageRedisService(
                new Redis({
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                }),
            ),
        }),
        IamModule,
        UserDescriptionModule,
        RolesModule,
        OrganizationsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
