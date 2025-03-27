"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
function checkAdminCredsMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const foundAdmin = yield db_1.AdminModel.findOne({ email });
            if (!foundAdmin) {
                res.status(403).json({
                    message: "Please sign up first"
                });
                return;
            }
            const isPasswordCorrect = yield bcryptjs_1.default.compare(password, foundAdmin.password);
            if (!isPasswordCorrect) {
                res.status(401).json({
                    message: "wrong password"
                });
            }
            else {
                req.headers.adminId = foundAdmin._id.toString();
                next();
            }
        }
        catch (err) {
            res.status(500).json({
                message: "Could not sign in admin. Server error"
            });
        }
    });
}
exports.default = checkAdminCredsMiddleware;
