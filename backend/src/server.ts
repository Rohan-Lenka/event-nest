import 'dotenv/config'
import express from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import bcrypt from "bcryptjs"
import { UserModel, AdminModel } from './db'
import validateFormatMiddleware from "./middlewares/validateFormatMiddleware"
import userAuthMiddleware from './middlewares/userAuthMiddleware'
import checkUserCredsMiddleware from './middlewares/checkUserCredsMiddleware'
import checkAdminCredsMiddleware from './middlewares/checkAdminCredsMiddleware'

const app = express()
const PORT = process.env.PORT
const USER_JWT_SECRET = process.env.USER_JWT_SECRET
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET

app.use(express.json())
app.use(cors())

app.post("/api/v1/user/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college } = req.body
    const user = await UserModel.find({ email })
    if (user.length > 0) {
        res.status(409).json({
            message: "user already exists"
        })
        return
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 6)
        // after creating college collections, add college to the database too
        await UserModel.create({ firstname, lastname, email, password: hashedPassword })
        res.json({
            message: "user signed up"
        })
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
})

app.post("/api/v1/user/signin", checkUserCredsMiddleware, async (req, res) => {
    const { email } = req.body
    // @ts-ignore
    const token = jwt.sign({ id: req.headers.userId }, USER_JWT_SECRET)
    res.json({
        token,
        message: "user successfully signed in"
    })
})

app.post("/api/v1/admin/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college, society } = req.body
    const admin = await AdminModel.find({ email })
    if (admin.length > 0) {
        res.status(409).json({
            message: "admin already exists"
        })
        return
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 6)
        // after creating college collections, add college to the database too
        // after creating society collections, add society to the database too
        await AdminModel.create({ firstname, lastname, email, password: hashedPassword })
        res.json({
            message: "admin signed up"
        })
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
})

app.post("/api/v1/admin/signin", checkAdminCredsMiddleware, async (req, res) => {
    const { email } = req.body
    // @ts-ignore
    const token = jwt.sign({ id: req.headers.userId }, ADMIN_JWT_SECRET)
    res.json({
        token,
        message: "admin successfully signed in"
    })
})

app.get("/api/v1/events", async (req, res) => {

})

app.post("/api/v1/events", async (req, res) => {

})

app.delete("/api/v1/events", async (req, res) => {

})

app.listen(PORT, () => {
    console.log("server running")
})