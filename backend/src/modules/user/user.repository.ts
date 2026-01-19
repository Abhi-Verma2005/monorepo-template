import { PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../core/repository';
import { UserUpdateDto } from './dto/user.dto';

export class UserRepository extends BaseRepository {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
    }

    async update(id: string, data: Omit<UserUpdateDto, 'id'>) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }

    async delete(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
