import { Request, Response, NextFunction } from "express";
import { z } from "zod"
function validateFormatMiddleware(req: Request, res: Response, next: NextFunction) {
    const reqBody = z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().min(3).max(50).email(),
        password: z
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
          college: z.string(),
          society: z.string().optional()
      });
    
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

export default validateFormatMiddleware