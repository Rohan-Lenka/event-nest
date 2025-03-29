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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const validateFormatMiddleware_1 = __importDefault(require("./middlewares/validateFormatMiddleware"));
const checkUserCredsMiddleware_1 = __importDefault(require("./middlewares/checkUserCredsMiddleware"));
const checkAdminCredsMiddleware_1 = __importDefault(require("./middlewares/checkAdminCredsMiddleware"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const config_1 = require("./config"); // replace MONGO_URL with mongo cloud instance before deployment
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// user
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
    const token = jsonwebtoken_1.default.sign({ id: req.headers.userId }, config_1.USER_JWT_SECRET);
    res.json({
        token,
        message: "user successfully signed in"
    });
}));
// admin
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
    const token = jsonwebtoken_1.default.sign({ id: req.headers.adminId }, config_1.ADMIN_JWT_SECRET);
    res.json({
        token,
        message: "admin successfully signed in"
    });
}));
// events for user & admin 
app.get("/api/v1/events", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const _id = req.Id;
    const type = req.headers.type;
    try {
        if (type === "admin") {
            const admin = yield db_1.AdminModel.findOne({ _id });
            const events = yield db_1.EventModel.find({ college: admin === null || admin === void 0 ? void 0 : admin.college }).select("name description society status date event_URL -_id");
            res.json({
                message: "all events fetched",
                events
            });
        }
        else if (type === "user") {
            const user = yield db_1.UserModel.findOne({ _id });
            const events = yield db_1.EventModel.find({ college: user === null || user === void 0 ? void 0 : user.college }).select("name description society status date event_URL -_id");
            res.json({
                message: "all events fetched",
                events
            });
        }
        else {
            // can never reach here
            // checked by middleware
        }
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
// admin control 
app.get("/api/v1/admin/events", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const _id = req.Id;
    try {
        const admin = yield db_1.AdminModel.findOne({ _id });
        if (!admin) {
            res.status(404).json({
                message: "admin not found"
            });
            return;
        }
        const adminEvents = yield db_1.EventModel.find({ admin: admin === null || admin === void 0 ? void 0 : admin._id }).select("name description society status date event_URL -_id");
        res.json({
            adminEvents
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
app.post("/api/v1/admin/events", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status, date, event_URL } = req.body;
    // @ts-ignore
    const _id = req.Id;
    try {
        const admin = yield db_1.AdminModel.findOne({ _id });
        const society = yield db_1.SocietyModel.findOne({ _id: admin === null || admin === void 0 ? void 0 : admin.society });
        // @ts-ignore
        yield db_1.EventModel.create({ name, description, status, date, event_URL, college: admin === null || admin === void 0 ? void 0 : admin.college, admin: admin === null || admin === void 0 ? void 0 : admin._id, society: society === null || society === void 0 ? void 0 : society.name });
        res.json({
            message: "new event added successfully"
        });
        return;
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
app.put("/api/v1/admin/events/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newName, newDescription, newStatus, newDate, newEvent_URL } = req.body;
    const _id = req.params.id;
    try {
        const event = yield db_1.EventModel.findOne({ _id });
        if (!event) {
            res.status(404).json({
                // @ts-ignore
                message: "requested event to update was not found"
            });
            return;
        }
        yield db_1.EventModel.findByIdAndUpdate(_id, { name: newName, description: newDescription, status: newStatus, date: newDate, event_URL: newEvent_URL });
        res.json({
            message: "event updated successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
app.delete("/api/v1/admin/events/:id", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const event = yield db_1.EventModel.findOne({ _id });
        if (!event) {
            res.status(404).json({
                // @ts-ignore
                message: "requested event to delete was not found"
            });
            return;
        }
        yield db_1.EventModel.findByIdAndDelete(_id);
        res.json({
            // @ts-ignore
            message: `${event.name} event deleted successfully`
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error"
        });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            yield mongoose_1.default.connect(config_1.MONGO_URL);
            console.log("Connected to database");
            const server = app.listen(config_1.PORT, () => {
                console.log(`Server running on port ${config_1.PORT}...`);
            });
            server.on('error', (err) => {
                console.error("Server failed to start:", err);
            });
        }
        catch (err) {
            console.error("Connection to DB failed:", err);
        }
    });
}
main();
