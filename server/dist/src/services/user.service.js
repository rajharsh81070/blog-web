"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.findAndUpdateUser = exports.findUser = exports.findUserById = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const createUser = async (input) => {
    return await user_model_1.default.create(input);
};
exports.createUser = createUser;
const findUserById = async (id) => {
    const user = await user_model_1.default.findById(id).lean();
    return (0, lodash_1.omit)(user, 'password');
};
exports.findUserById = findUserById;
const findUser = async (query, options = {}) => {
    return await user_model_1.default.findOne(query, {}, options).select('+password');
};
exports.findUser = findUser;
const findAndUpdateUser = async (query, update, options) => {
    return await user_model_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateUser = findAndUpdateUser;
const signToken = async (user) => {
    const access_token = (0, jwt_1.signJwt)({ id: user.id }, {
        expiresIn: `9 days`,
    });
    return { access_token };
};
exports.signToken = signToken;
