import { Request, Response, NextFunction } from "express";
import { z } from "zod"

function validateEventMiddleware(req: Request, res: Response, next: NextFunction) {
    const reqBody = z.object({
        name: z.string().max(50, "Name is too long"),
        description: z.string().max(1000, "Description is too long"),
        status: z.enum(["Ongoing", "Upcoming"]),
        date: z.object({
            D: z.number().int().gte(1, "Invalid date").lte(31, "Invalid date"),
            M: z.number().int().gte(1, "Invalid date").lte(12, "Invalid date"),
            Y: z.number().int().gte(1000, "Date not acceptable").lte(9999, "Date not acceptable")
        }),
        event_URL: z.string()
    })
    const parsedData = reqBody.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: `Incorrect format. ${parsedData.error.issues[0].message}`,
        });
        return;
    } else {
        next()
    }
}
export default validateEventMiddleware