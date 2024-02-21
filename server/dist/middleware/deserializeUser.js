"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
const deserializeUser = async (req, res, next) => {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        if (!access_token) {
            return next(new appError_1.default('You are not logged in', 401));
        }
        const decoded = (0, jwt_1.verifyJwt)(access_token);
        if (!decoded) {
            return next(new appError_1.default(`Invalid token or user doesn't exist`, 401));
        }
        if (Number(decoded.exp) * 1000 < new Date().getTime()) {
            return next(new appError_1.default(`User session has expired`, 401));
        }
        const user = await (0, user_service_1.findUserById)(decoded.id);
        if (!user) {
            return next(new appError_1.default(`User with that token no longer exist`, 401));
        }
        res.locals.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.deserializeUser = deserializeUser;
