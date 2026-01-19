import { UserRepository } from './user.repository';
import { UserUpdateDto } from './dto/user.dto';
import { HttpException } from '../../core/http-exception';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new HttpException(404, 'User not found');
        }
        return user;
    }

    async updateUser(userId: string, data: UserUpdateDto) {
        if (userId !== data.id) {
            throw new HttpException(403, 'You can only update your own profile');
        }
        const { id, ...updateData } = data;
        return this.userRepository.update(id, updateData);
    }

    async deleteUser(currentUserId: string, targetuserId: string) {
        if (currentUserId !== targetuserId) {
            throw new HttpException(403, 'You can only delete your own profile');
        }
        return this.userRepository.delete(targetuserId);
    }
}
