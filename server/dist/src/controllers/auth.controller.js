"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const user_service_1 = require("../services/user.service");
const appError_1 = __importDefault(require("../utils/appError"));
const registerHandler = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.createUser)({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });
        await user.save();
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already exist',
            });
        }
        next(err);
    }
};
exports.registerHandler = registerHandler;
const loginHandler = async (req, res, next) => {
    try {
        let user = await (0, user_service_1.findUser)({ email: req.body.email });
        if (!user ||
            !(await user.comparePasswords(user.password, req.body.password))) {
            return next(new appError_1.default('Invalid email or password', 401));
        }
        const { access_token } = await (0, user_service_1.signToken)(user);
        res.set('Authorization', `Bearer ${access_token}`);
        res.status(200).json({
            status: 'success',
            access_token: `${access_token}`,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginHandler = loginHandler;
const logoutHandler = async (req, res, next) => {
    try {
        res.status(200).json({ status: 'Logout Successfull' });
    }
    catch (err) {
        next(err);
    }
};
exports.logoutHandler = logoutHandler;
