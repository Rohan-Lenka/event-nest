import express, { Response } from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose'
import { UserModel, AdminModel, CollegeModel, SocietyModel, EventModel } from './db'
import validateFormatMiddleware from "./middlewares/validateFormatMiddleware"
import checkUserCredsMiddleware from './middlewares/checkUserCredsMiddleware'
import checkAdminCredsMiddleware from './middlewares/checkAdminCredsMiddleware'
import authMiddleware from './middlewares/authMiddleware'
import { PORT, ADMIN_JWT_SECRET, USER_JWT_SECRET, MONGO_URL } from './config'  // replace MONGO_URL with mongo cloud instance before deployment

const app = express()

app.use(express.json())
app.use(cors())

// signup
app.post("/api/v1/user/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            res.status(409).json({
                message: "user already exists"
            })
            return
        }
        const foundCollege = await CollegeModel.findOne({ name: college })
        if (!foundCollege) {
            res.json({
                message: "no college found"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 6)
        await UserModel.create({ firstname, lastname, email, password: hashedPassword, college: foundCollege._id })
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

// signin
app.post("/api/v1/admin/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college, society } = req.body
    try {

        const admin = await AdminModel.find({ email })
        if (admin.length > 0) {
            res.status(409).json({
                message: "admin already exists"
            })
            return
        }

        let collegeId: mongoose.Types.ObjectId
        const foundCollege = await CollegeModel.findOne({ name: college })
        if (!foundCollege) {
            const newCollege = await CollegeModel.create({ name: college })
            collegeId = newCollege._id
        } else {
            collegeId = foundCollege._id
        }

        const foundSociety = await SocietyModel.findOne({ name: society })
        if (foundSociety) {
            res.json({
                message: "admin of this society already exists",
            })
            return
        }
        const newSociety = await SocietyModel.create({ name: society, college: collegeId })

        const hashedPassword = await bcrypt.hash(password, 6)
        await AdminModel.create({ firstname, lastname, email, password: hashedPassword, college: collegeId, society: newSociety._id })
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
    const token = jwt.sign({ id: req.headers.adminId }, ADMIN_JWT_SECRET)
    res.json({
        token,
        message: "admin successfully signed in"
    })
})

// events for user & admin 
app.get("/api/v1/events", authMiddleware, async (req, res) => {
    // @ts-ignore
    const _id = req.Id
    const type = req.headers.type
    try {
        if (type === "admin") {
            const admin = await AdminModel.findOne({ _id })
            const events = await EventModel.find({ college: admin?.college }).select("name description status date event_URL -_id")
            res.json({
                message: "all events fetched",
                events
            })
        } else if (type === "user") {
            const user = await UserModel.findOne({ _id })
            const events = await EventModel.find({ college: user?.college }).select("name description status date event_URL -_id")
            res.json({
                message: "all events fetched",
                events
            })
        } else {
            // can never reach here
            // checked by middleware
        }
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
})

// admin
app.get("/api/v1/admin/events", authMiddleware, async (req, res) => {
    // @ts-ignore
    const _id = req.Id
    try {
        const admin = await AdminModel.findOne({ _id })
        if(!admin) {
            res.status(404).json({
                message: "admin not found"
            })
            return 
        }
        const adminEvents = await EventModel.find({ society: admin?.society }).select("name description status date event_URL -_id")
        res.json({
            adminEvents
        })
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
}) 

app.post("/api/v1/admin/events", authMiddleware, async (req, res) => {
    const { name, description, status, date, event_URL } = req.body
    // @ts-ignore
    const _id = req.Id
    try {
        const admin = await AdminModel.findOne({ _id })
        // @ts-ignore
        await EventModel.create({ name, description, status, date, event_URL, college: admin?.college, society: admin?.society })
        res.json({
            message: "new event added successfully"
        })
        return
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
})

app.delete("/api/v1/admin/events/:id", authMiddleware, async (req, res) => {
    const _id =  req.params.id
    try {
        const event = await EventModel.findOne({ _id })
        if (!event) {
            res.status(404).json({
                // @ts-ignore
                message: "requested event to delete was not found"
            })
            return
        }
        await EventModel.findByIdAndDelete(_id)
        res.json({
            // @ts-ignore
            message: `${event.name} event deleted successfully`
        })
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
})

async function main() {
    try {
        // @ts-ignore
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database")
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`)
        })
        server.on('error', (err) => {
            console.error("Server failed to start:", err)
        })
    } catch (err) {
        console.error("Connection to DB failed:", err)
    }
}

main()