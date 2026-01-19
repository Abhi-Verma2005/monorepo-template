import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export const signToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export interface UserPayload extends jwt.JwtPayload {
    userId: string;
}

export const verifyToken = (token: string): UserPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as UserPayload;
    } catch (error) {
        return null;
    }
};
