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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
const validateFormatMiddleware_1 = __importDefault(require("./middlewares/validateFormatMiddleware"));
const userAuthMiddleware_1 = __importDefault(require("./middlewares/userAuthMiddleware"));
const checkUserCredsMiddleware_1 = __importDefault(require("./middlewares/checkUserCredsMiddleware"));
const checkAdminCredsMiddleware_1 = __importDefault(require("./middlewares/checkAdminCredsMiddleware"));
const adminAuthMiddleware_1 = __importDefault(require("./middlewares/adminAuthMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/user/signup", validateFormatMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, college } = req.body;
    try {
        const user = yield db_1.UserModel.find({ email });
        if (user.length > 0) {
            res.status(409).json({
                message: "user already exists"
            });
            return;
        }
        const foundCollege = yield db_1.CollegeModel.findOne({ name: college });
        if (!foundCollege) {
            res.json({
                message: "no college found"
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 6);
        yield db_1.UserModel.create({ firstname, lastname, email, password: hashedPassword, college: foundCollege._id });
        res.json({
            message: "user signed up"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
app.post("/api/v1/user/signin", checkUserCredsMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: req.headers.userId }, USER_JWT_SECRET);
    res.json({
        token,
        message: "user successfully signed in"
    });
}));
app.post("/api/v1/admin/signup", validateFormatMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, college, society } = req.body;
    try {
        const admin = yield db_1.AdminModel.find({ email });
        if (admin.length > 0) {
            res.status(409).json({
                message: "admin already exists"
            });
            return;
        }
        let collegeId;
        const foundCollege = yield db_1.CollegeModel.findOne({ name: college });
        if (!foundCollege) {
            const newCollege = yield db_1.CollegeModel.create({ name: college });
            collegeId = newCollege._id;
        }
        else {
            collegeId = foundCollege._id;
        }
        const foundSociety = yield db_1.SocietyModel.findOne({ name: society });
        if (foundSociety) {
            res.json({
                message: "admin of this society already exists",
            });
            return;
        }
        const newSociety = yield db_1.SocietyModel.create({ name: society, college: collegeId });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 6);
        yield db_1.AdminModel.create({ firstname, lastname, email, password: hashedPassword, college: collegeId, society: newSociety._id });
        res.json({
            message: "admin signed up"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
app.post("/api/v1/admin/signin", checkAdminCredsMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: req.headers.userId }, ADMIN_JWT_SECRET);
    res.json({
        token,
        message: "admin successfully signed in"
    });
}));
app.get("/api/v1/user/events", userAuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.get("/api/v1/admin/events", adminAuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.post("/api/v1/admin/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.delete("/api/v1/admin/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(PORT, () => {
    console.log("server running");
});
