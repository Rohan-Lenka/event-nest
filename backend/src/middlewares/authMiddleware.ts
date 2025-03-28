import jwt from "jsonwebtoken";
import { ADMIN_JWT_SECRET } from "../config"
import { USER_JWT_SECRET } from "../config"
import { NextFunction, Request, Response } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    const type = req.headers.type
    if (type === "admin") {
        try {
            const decoded = jwt.verify(token as string, ADMIN_JWT_SECRET as string)
            if (decoded) {
                // @ts-ignore
                req.Id = decoded.id
                next()
            }
        } catch (err) {
            res.status(401).json({
                message: "unauthorized admmin"
            })
        }
    } else if(type === "user") {
        try {
            const decoded = jwt.verify(token as string, USER_JWT_SECRET as string)
            if (decoded) {
                // @ts-ignore
                req.Id = decoded.id
                next()
            }
        } catch (err) {
            res.status(401).json({
                message: "unauthorized user"
            })
        }
    } else {
        res.status(400).json({
            message: "wrong value provided for type key"
        })
    }
}

export default authMiddleware