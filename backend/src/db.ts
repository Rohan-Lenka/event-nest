import 'dotenv/config'
import mongoose, { model, Schema } from "mongoose";
const MONGO_URL = process.env.MONGO_URL  // replace with cloud db instance before deploying 
// @ts-ignore
mongoose.connect(MONGO_URL)

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // college: { type: String, required: true, ref: }
})
export const UserModel = model("User", UserSchema)

const AdminSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // college: { type: String, required: true, ref: }
    // society: { type: String, required: true, ref: }
})
export const AdminModel = model("Admin", AdminSchema)