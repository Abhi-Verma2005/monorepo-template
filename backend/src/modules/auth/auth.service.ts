import bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { HttpException } from '../../core/http-exception';
import { signToken } from '../../utils/jwt';
import { Logger } from '../../utils/logger';

export class AuthService {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async register(data: RegisterDto) {
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new HttpException(409, 'User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.authRepository.createUser({
            ...data,
            password: hashedPassword,
        });

        const token = signToken({ userId: user.id });
        Logger.info(`User registered: ${user.email}`);

        return { token, user: { id: user.id, email: user.email, name: user.name } };
    }

    async login(data: LoginDto) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user) {
            throw new HttpException(401, 'Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new HttpException(401, 'Invalid credentials');
        }

        const token = signToken({ userId: user.id });
        Logger.info(`User logged in: ${user.email}`);

        return { token, user: { id: user.id, email: user.email, name: user.name } };
    }
}
