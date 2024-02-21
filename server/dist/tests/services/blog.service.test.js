"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogService = __importStar(require("../../src/services/blog.service"));
const blog_model_1 = __importDefault(require("../../src/models/blog.model"));
jest.mock('../../src/models/blog.model');
describe('Blog Service', () => {
    describe('createBlog', () => {
        it('creates a blog with the given input and user_id', async () => {
            const input = { title: 'Test Blog', content: 'Test Content' };
            const user_id = 'user123';
            const createMock = jest.fn().mockResolvedValue({});
            blog_model_1.default.create = createMock;
            await blogService.createBlog({ input, user_id });
            expect(createMock).toHaveBeenCalledWith({ ...input, user: user_id });
        });
    });
});
