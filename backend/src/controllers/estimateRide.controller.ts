import { Request, Response } from "express";
import { mockService } from "../services/mockService";
import Ride from "../models/ride.model";
import { pendingRide } from "../services/pendingRideService";

interface CustomError extends Error{
  error_code?: string;
  error_description?: string;
  statusCode?: number;
}

export async function estimateRide(req: Request, res: Response) {
  try {
    const { user, origin, destination } = req.body;

    const response = await mockService(origin, destination);
    
    await pendingRide(user, origin, destination, response.distance, response.duration);

    res.status(200).json(response);
  } catch (error) {

    const customError = error as CustomError

    res.status(customError.statusCode!).json({ 
      error_code: customError.error_code || "INTERNAL_ERROR",
      error_description: customError.error_description || "Erro desconhecido"
     });

  }
}
