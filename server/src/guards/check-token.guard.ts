import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CheckTokenGuard implements CanActivate {
    constructor(@Inject('IAM_SERVICE') private readonly client: ClientProxy) {}

    private async checkToken(refreshToken: string) {
        const token = await firstValueFrom(
            this.client.send('check-token', refreshToken),
        );
        console.log(token);

        return token;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [, token] = request.headers.authorization?.split(' ') ?? [];
        return token;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        const newToken = await this.checkToken(token);

        if (newToken) {
            return true;
        }
        throw new ForbiddenException('Not authorized');
    }
}
