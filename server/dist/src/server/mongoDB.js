"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbUrl = process.env.DB_CONNECT_URL || '';
const mongoDB = async () => {
    try {
        await mongoose_1.default.connect(dbUrl);
        console.log('Database connected...');
    }
    catch (error) {
        console.log(error.message);
        setTimeout(mongoDB, 5000);
    }
};
exports.default = mongoDB;
