"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const config_2 = require("../config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const type = req.headers.type;
    if (type === "admin") {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.ADMIN_JWT_SECRET);
            if (decoded) {
                // @ts-ignore
                req.Id = decoded.id;
                next();
            }
        }
        catch (err) {
            res.status(401).json({
                message: "unauthorized admmin"
            });
        }
    }
    else if (type === "user") {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_2.USER_JWT_SECRET);
            if (decoded) {
                // @ts-ignore
                req.Id = decoded.id;
                next();
            }
        }
        catch (err) {
            res.status(401).json({
                message: "unauthorized user"
            });
        }
    }
    else {
        res.status(400).json({
            message: "wrong value provided for type key"
        });
    }
}
exports.default = authMiddleware;
