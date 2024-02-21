"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../src/utils/appError"));
describe('AppError', () => {
    it('creates an instance with default status code', () => {
        const errorMessage = 'Test error message';
        const error = new appError_1.default(errorMessage);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(500);
        expect(error.status).toBe('error');
    });
    it('creates an instance with custom status code', () => {
        const errorMessage = 'Test error message';
        const statusCode = 404;
        const error = new appError_1.default(errorMessage, statusCode);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(statusCode);
        expect(error.status).toBe('fail');
    });
    it('creates an instance with status code from string', () => {
        const errorMessage = 'Test error message';
        const statusCode = '404';
        const error = new appError_1.default(errorMessage, Number(statusCode));
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
        expect(error.status).toBe('fail');
    });
    it('captures stack trace', () => {
        const errorMessage = 'Test error message';
        const error = new appError_1.default(errorMessage);
        expect(error.stack).toBeDefined();
    });
});
