import { Request, Response } from "express";
import { mockService } from "../services/mockService";
import { pendingRide } from "../services/pendingRideService";
import { CustomError } from "../types/erros";



export async function estimateRide(req: Request, res: Response) {
  try {
    const { user, origin, destination } = req.body;

    const response = await mockService(origin, destination);
    
    await pendingRide(user, origin, destination, response.distance, response.duration);

    res.status(200).json(response);
  } catch (error) {

    const customError = error as CustomError

    res.status(customError.statusCode! || 500).json({ 
      error_code: customError.error_code || "INTERNAL_ERROR",
      error_description: customError.error_description || "Erro desconhecido"
     });

  }
}
