"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../src/utils/jwt");
jest.mock('dotenv', () => ({
    config: jest.fn(),
}));
process.env.JWT_SECRET = 'testSecret';
describe('JWT Utils', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('signJwt', () => {
        it('should sign JWT token', () => {
            const payload = { userId: '123' };
            const token = (0, jwt_1.signJwt)(payload);
            const decoded = jsonwebtoken_1.default.verify(token, process?.env?.JWT_SECRET || '');
            expect(decoded).toMatchObject(payload);
        });
        it('should sign JWT token with provided options', () => {
            const payload = { userId: '123' };
            const options = { expiresIn: '1h' };
            const token = (0, jwt_1.signJwt)(payload, options);
            const decoded = jsonwebtoken_1.default.verify(token, process?.env?.JWT_SECRET || '');
            expect(decoded).toMatchObject(payload);
        });
    });
    describe('verifyJwt', () => {
        it('should verify JWT token and return payload', () => {
            const payload = { userId: '123' };
            const token = jsonwebtoken_1.default.sign(payload, process?.env?.JWT_SECRET || '');
            const decoded = (0, jwt_1.verifyJwt)(token);
            expect(decoded).toMatchObject(payload);
        });
        it('should return null for invalid token', () => {
            const token = 'invalid_token';
            const decoded = (0, jwt_1.verifyJwt)(token);
            expect(decoded).toBeNull();
        });
        it('should return null for expired token', () => {
            const payload = { userId: '123' };
            const token = jsonwebtoken_1.default.sign(payload, process?.env?.JWT_SECRET || '', {
                expiresIn: '-1s',
            });
            const decoded = (0, jwt_1.verifyJwt)(token);
            expect(decoded).toBeNull();
        });
    });
});
