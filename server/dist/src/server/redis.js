"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAvailable = exports.setAsync = exports.getAsync = exports.client = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const util_1 = require("util");
const client = new ioredis_1.default({
    port: 6379,
    host: 'localhost',
    db: 0,
});
exports.client = client;
const getAsync = (0, util_1.promisify)(client.get).bind(client);
exports.getAsync = getAsync;
const setAsync = (0, util_1.promisify)(client.set).bind(client);
exports.setAsync = setAsync;
let isAvailable = true;
exports.isAvailable = isAvailable;
client.on('error', (err) => {
    exports.isAvailable = isAvailable = false;
    console.error('Redis Client Error:', err);
});
