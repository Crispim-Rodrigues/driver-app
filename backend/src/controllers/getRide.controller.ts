import { Request, Response } from "express";
import { CustomError } from "../types/erros";
import { getRideService } from "../services/getRideService";


export async function getRide(req: Request, res: Response) {
    try {
       const response = await getRideService(req);
       res.status(200).json(response);
    } catch (error) {
  
      const customError = error as CustomError
  
      res.status(customError.statusCode! || 500).json({ 
        error_code: customError.error_code || "INTERNAL_ERROR",
        error_description: customError.error_description || "Erro desconhecido"
       });
  
    }
  }
  