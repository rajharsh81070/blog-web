"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBlogs = exports.findBlogById = exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
const createBlog = async ({ input, user_id, }) => {
    return await blog_model_1.default.create({ ...input, user: user_id });
};
exports.createBlog = createBlog;
const findBlogById = async (id) => await blog_model_1.default
    .findById(id)
    .populate('user')
    .lean()
    .exec()
    .then((blog) => JSON.parse(JSON.stringify(blog)));
exports.findBlogById = findBlogById;
const findAllBlogs = async () => {
    const blogs = (await blog_model_1.default
        .find()
        .populate('user')
        .sort({ createdAt: -1 })
        .lean()
        .exec()).map((blog) => JSON.parse(JSON.stringify(blog)));
    return blogs;
};
exports.findAllBlogs = findAllBlogs;
