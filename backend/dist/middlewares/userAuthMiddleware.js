"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
function userAuthMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        // @ts-ignore
        const verifiedToken = jsonwebtoken_1.default.verify(token, USER_JWT_SECRET);
        if (verifiedToken) {
            // @ts-ignore
            req.userId = verifiedToken.id;
            next();
        }
    }
    catch (err) {
        res.status(403).json({
            message: "authentication unsuccessful, invalid token"
        });
    }
}
exports.default = userAuthMiddleware;
