"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const blog_schema_1 = require("../schema/blog.schema");
const router = express_1.default.Router();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
router
    .route('')
    .post((0, validate_1.validate)(blog_schema_1.createBlogSchema), blog_controller_1.createBlogHandler)
    .get(blog_controller_1.getBlogsHandler);
router.route('/:blogId').get((0, validate_1.validate)(blog_schema_1.getBlogSchema), blog_controller_1.getBlogHandler);
exports.default = router;
