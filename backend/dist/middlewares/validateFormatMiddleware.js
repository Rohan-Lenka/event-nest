"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
function validateFormatMiddleware(req, res, next) {
    const reqBody = zod_1.z.object({
        firstname: zod_1.z.string(),
        lastname: zod_1.z.string(),
        email: zod_1.z.string().min(3).max(50).email(),
        password: zod_1.z
            .string()
            .min(6)
            .refine((password) => /[A-Z]/.test(password), {
            message: "Required atleast one uppercase character",
        })
            .refine((password) => /[0-9]/.test(password), {
            message: "Required atleast one number",
        })
            .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Required atleast one special character",
        }),
        college: zod_1.z.string(),
        society: zod_1.z.string().optional()
    });
    const parsedData = reqBody.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect format",
            error: parsedData.error.issues[0].message,
        });
        return;
    }
    else {
        next();
    }
}
exports.default = validateFormatMiddleware;
