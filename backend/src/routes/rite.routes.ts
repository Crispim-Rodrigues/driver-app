import express from 'express';
import { validateRide } from '../middleware/rideMiddleware';
import { estimateRideSchema } from '../schemas/estimate.schema';
import { estimateRide } from '../controllers/estimateRide.controller';

const rideRouter = express.Router();

// Rota para estimar corrida
rideRouter.post("/estimate", validateRide(estimateRideSchema), estimateRide)

export default rideRouter;