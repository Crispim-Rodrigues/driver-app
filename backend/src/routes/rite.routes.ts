import express from 'express';
import { validateRide } from '../middleware/rideMiddleware';
import { estimateRideSchema } from '../schemas/estimate.schema';
import { estimateRide } from '../controllers/estimateRide.controller';
import { confirmSchema } from '../schemas/confirm.schema';
import { confirmRide } from '../controllers/confirmRide.controller';

const rideRouter = express.Router();

// Rota para estimar corrida
rideRouter.post("/estimate", validateRide(estimateRideSchema), estimateRide)
rideRouter.patch("/confirm", validateRide(confirmSchema), confirmRide)

export default rideRouter;