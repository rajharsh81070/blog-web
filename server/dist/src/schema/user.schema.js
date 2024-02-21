"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Invalid email'),
        password: (0, zod_1.string)({ required_error: 'Password is required' }),
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }),
        password: (0, zod_1.string)({ required_error: 'Password is required' }),
    }),
});
