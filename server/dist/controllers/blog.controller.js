"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsHandler = exports.getBlogHandler = exports.createBlogHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const blog_service_1 = require("../services/blog.service");
const redis_1 = require("../server/redis");
const createBlogHandler = async (req, res, next) => {
    try {
        const user_id = res.locals.user.id;
        const createdBlog = await (0, blog_service_1.createBlog)({ input: req.body, user_id });
        const blog = await (0, blog_service_1.findBlogById)(createdBlog.id);
        redis_1.isAvailable && (await redis_1.client.del('blogs'));
        res.status(201).json({
            status: 'success',
            blog: {
                id: blog.id,
                title: blog.title,
                content: blog.content,
                authorName: blog.user.name,
                createdAt: blog.createdAt,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createBlogHandler = createBlogHandler;
const getBlogHandler = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        if (redis_1.isAvailable) {
            const cachedBlog = await (0, redis_1.getAsync)(blogId);
            if (cachedBlog) {
                res.json(JSON.parse(cachedBlog));
            }
        }
        const blog = await (0, blog_service_1.findBlogById)(blogId);
        if (!blog) {
            return next(new appError_1.default('Blog with that ID not found', 404));
        }
        const responseData = {
            status: 'success',
            blog: {
                id: blog.id,
                title: blog.title,
                content: blog.content,
                authorName: blog.user.name,
                createdAt: blog.createdAt,
            },
        };
        redis_1.isAvailable && (await (0, redis_1.setAsync)(blogId, JSON.stringify(responseData)));
        res.status(200).json(responseData);
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogHandler = getBlogHandler;
const getBlogsHandler = async (req, res, next) => {
    try {
        if (redis_1.isAvailable) {
            const cachedBlogs = await (0, redis_1.getAsync)('blogs');
            if (cachedBlogs) {
                res.json(JSON.parse(cachedBlogs));
            }
        }
        const blogs = await (0, blog_service_1.findAllBlogs)();
        const responseData = {
            status: 'success',
            blogs: blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                content: blog.content,
                authorName: blog.user.name,
                createdAt: blog.createdAt,
            })),
        };
        redis_1.isAvailable && (await (0, redis_1.setAsync)('blogs', JSON.stringify(responseData)));
        res.status(200).json(responseData);
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogsHandler = getBlogsHandler;
