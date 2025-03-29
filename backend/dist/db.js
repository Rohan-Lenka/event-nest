"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.SocietyModel = exports.CollegeModel = exports.AdminModel = exports.UserModel = void 0;
require("dotenv/config");
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "College" }
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
const AdminSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    college: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "College" },
    society: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Society" }
});
exports.AdminModel = (0, mongoose_1.model)("Admin", AdminSchema);
const CollegeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }
});
exports.CollegeModel = (0, mongoose_1.model)("College", CollegeSchema);
const SocietySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    college: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "College" }
});
exports.SocietyModel = (0, mongoose_1.model)("Society", SocietySchema);
const EventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: {
        type: {
            D: { type: Number, required: true },
            M: { type: Number, required: true },
            Y: { type: Number, required: true }
        },
        required: true
    },
    event_URL: { type: String, required: true },
    college: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "College" },
    admin: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Admin" },
    society: { type: String, required: true }
});
exports.EventModel = (0, mongoose_1.model)("Event", EventSchema);
