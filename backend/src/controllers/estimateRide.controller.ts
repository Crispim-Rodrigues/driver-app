import { Request, Response } from "express";

import { getRouteService } from "../services/getRouteService";
import { mockService } from "../services/mockService";

export async function estimateRide(req: Request, res: Response) {
  try {
    const { user, origin, destination } = req.body;

    const response = await mockService(origin, destination);
    
    res.status(200).json(response);
  } catch (error) {
    if (error) {
      res.status(500).json({ error });
    } else {
      res
        .status(500)
        .json({ error_code: "INTERNAL_ERROR", error_description: error });
    }
  }
}
