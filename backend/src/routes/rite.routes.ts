import express from 'express';
import { validateRide } from '../middleware/rideMiddleware';
import { estimateRideSchema } from '../schemas/estimate.schema';
import { estimateRide } from '../controllers/estimateRide.controller';
import { confirmSchema } from '../schemas/confirm.schema';
import { confirmRide } from '../controllers/confirmRide.controller';
import { validateGetRide } from '../middleware/getRidesMiddleware';
import { getRide } from '../controllers/getRide.controller';
import { customerSchema, driverSchema } from '../schemas/getRide.schema';

const rideRouter = express.Router();

// Rotas
rideRouter.post("/estimate", validateRide(estimateRideSchema), estimateRide)
rideRouter.patch("/confirm", validateRide(confirmSchema), confirmRide)
rideRouter.get("/:customer_id", validateGetRide(customerSchema, driverSchema), getRide);

export default rideRouter;