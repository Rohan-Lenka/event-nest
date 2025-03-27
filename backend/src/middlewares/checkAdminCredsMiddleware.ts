import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import { AdminModel } from "../db";

async function checkAdminCredsMiddleware( req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const foundAdmin = await AdminModel.findOne({ email })
        if(!foundAdmin) {
            res.status(403).json({
                message: "Please sign up first"
            })
            return 
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password)
        if(!isPasswordCorrect) {
            res.status(401).json({
                message: "wrong password"
            })
        } else {
            req.headers.adminId = foundAdmin._id.toString()
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: "Could not sign in admin. Server error"
        })
    }
}
export default checkAdminCredsMiddleware