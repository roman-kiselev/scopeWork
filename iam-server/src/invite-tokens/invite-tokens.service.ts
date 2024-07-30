import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateInviteTokenDto } from './dto/create/create-invite-token.dto';
import { InviteToken } from './entities/invite-token.entity';
import { TimeHelper } from './helpers/time.helper';

@Injectable()
export class InviteTokensService {
    constructor(
        @InjectRepository(InviteToken)
        private readonly inviteTokenRepository: Repository<InviteToken>,
    ) {}
    async create(dto: CreateInviteTokenDto, organizationId: number) {
        const isInviteToken = await this.inviteTokenRepository.findOneBy({
            email: dto.email,
            org_id: organizationId,
        });
        if (isInviteToken) {
            throw new ConflictException('Invite token already exists');
        }
        const token = uuid();
        const inviteToken = this.inviteTokenRepository.create({
            ...dto,
            token,
            created_at: new TimeHelper().getCurrentTime(),
            // expires_at: new TimeHelper().getCurrentTime(),
            expires_at: new TimeHelper().getExpiresAt(),
            org_id: organizationId,
        });

        return await this.inviteTokenRepository.save(inviteToken);
    }

    async getTokenByEmail(email: string, organizationId: number) {
        const token = await this.inviteTokenRepository.findOneBy({
            email,
            org_id: organizationId,
        });
        if (!token) {
            throw new NotFoundException('Invite token not found');
        }

        return token;
    }

    async getAllTokens(organizationId: number) {
        return await this.inviteTokenRepository.find({
            where: {
                org_id: organizationId,
            },
        });
    }

    async checkExpiredToken(token: string, organizationId: number) {
        const inviteToken = await this.inviteTokenRepository.findOneBy({
            token,
            org_id: organizationId,
        });
        if (!inviteToken) {
            throw new NotFoundException('Invite token not found');
        }
        const isExpired = new TimeHelper().isExpired(
            new Date(inviteToken.expires_at).toISOString(),
        );

        if (isExpired) {
            throw new BadRequestException('Invite token expired');
        }

        return inviteToken;
    }

    async isUsedToken(token: string, organizationId: number) {
        const inviteToken = await this.inviteTokenRepository.findOneBy({
            token,
            org_id: organizationId,
        });
        if (!inviteToken) {
            throw new NotFoundException('Invite token not found');
        }
        return inviteToken.is_used;
    }

    async updateToken(id: number, organizationId: number) {
        const inviteToken = await this.inviteTokenRepository.findOneBy({
            id,
            org_id: organizationId,
        });
        if (!inviteToken) {
            throw new NotFoundException('Invite token not found');
        }
        const token = uuid();
        inviteToken.token = token;
        inviteToken.expires_at = new Date(new TimeHelper().getExpiresAt());

        return await this.inviteTokenRepository.save(inviteToken);
    }

    async setIsUsed(id: number, organizationId: number) {
        const inviteToken = await this.inviteTokenRepository.findOneBy({
            id,
            org_id: organizationId,
        });
        if (!inviteToken) {
            throw new NotFoundException('Invite token not found');
        }
        inviteToken.is_used = true;
        return await this.inviteTokenRepository.save(inviteToken);
    }
}
