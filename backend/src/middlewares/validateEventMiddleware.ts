import { Request, Response, NextFunction } from "express";
import { z } from "zod"

function validateEventMiddleware(req: Request, res: Response, next: NextFunction) {
    const reqBody = z.object({
        name: z.string().max(50),
        description: z.string().max(100),
        status: z.enum(["Ongoing", "Upcoming"]),
        date: z.object({
            D: z.number().int().gte(1).lte(31),
            M: z.number().int().gte(1).lte(12),
            Y: z.number().int().gte(1000).lte(9999)
        }),
        event_URL: z.string()
    })
    const parsedData = reqBody.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect format",
            error: parsedData.error.issues[0].message,
        });
        return;
    } else {
        next()
    }
}
export default validateEventMiddleware