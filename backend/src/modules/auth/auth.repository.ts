import { PrismaClient, User } from '@prisma/client';
import { BaseRepository } from '../../core/repository';
import { RegisterDto } from './dto/auth.dto';

export class AuthRepository extends BaseRepository {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(data: RegisterDto & { password: string }): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
