"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoDB_1 = __importDefault(require("./server/mongoDB"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const blog_route_1 = __importDefault(require("./routes/blog.route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const frontendUrl = process.env?.FRONTEND_URL ?? 'http://localhost:3000';
app.use((0, cors_1.default)({
    credentials: true,
    origin: [frontendUrl],
}));
app.get('/api/healthcheck', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
    });
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/blogs', blog_route_1.default);
// Unknown Routes
app.all('/api/*', (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Global Error Handler
app.use((err, req, res, _next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../../client/build', 'index.html'));
    });
}
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    (0, mongoDB_1.default)();
});
