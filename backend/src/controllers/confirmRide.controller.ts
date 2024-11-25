import { Request, Response } from "express";
import { CustomError } from "../types/erros";
import { confirmService } from "../services/confirmService";

export async function confirmRide(req: Request, res: Response) {
    try {
        const response = await confirmService(req.body);
        res.status(200).json({
            "success": response
        })
        
    } catch (error) {
  
      const customError = error as CustomError
  
      res.status(customError.statusCode! || 500).json({ 
        error_code: customError.error_code || "INTERNAL_ERROR",
        error_description: customError.error_description || "Erro desconhecido"
       });
  
    }
  }
  