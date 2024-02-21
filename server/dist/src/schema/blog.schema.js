"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        content: (0, zod_1.string)({
            required_error: 'Content is required',
        }),
        title: (0, zod_1.string)({
            required_error: 'Title is required',
        }),
    }),
});
const blogParams = {
    params: (0, zod_1.object)({
        blogId: (0, zod_1.string)(),
    }),
};
exports.getBlogSchema = (0, zod_1.object)({
    ...blogParams,
});
