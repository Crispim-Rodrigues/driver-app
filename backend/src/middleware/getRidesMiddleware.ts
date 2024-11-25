import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodString, ZodOptional} from "zod";
import { StatusCodes } from "http-status-codes";

export function validateGetRide(customerSchema: ZodString, driverSchema: z.ZodEffects<ZodOptional<ZodString>>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        customerSchema.parse(req.params.customer_id);
        driverSchema.parse(req.query.driver_id)
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (issue: any) => `${issue.message}`
        );
        res.status(StatusCodes.BAD_REQUEST).json({
          error_code: "INVALID_DATA",
          error_description: errorMessages,
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
