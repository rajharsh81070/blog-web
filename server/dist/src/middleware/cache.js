"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../server/redis");
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    (0, redis_1.getAsync)(key)
        .then((data) => {
        if (data) {
            res.json(JSON.parse(data));
        }
        else {
            const originalJson = res.json;
            res.json = (body) => {
                (0, redis_1.setAsync)(key, JSON.stringify(body));
                return originalJson.call(res, body);
            };
            next();
        }
    })
        .catch((err) => {
        console.error('Redis cache error:', err);
        next();
    });
};
exports.default = cacheMiddleware;
