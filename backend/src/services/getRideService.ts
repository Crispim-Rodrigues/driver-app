import { Request} from "express";
import Ride from "../models/ride.model";
import Driver from "../models/driver.model";

export async function getRideService(req: Request) {
  const customer_id = req.params.customer_id;
  const driver_id = req.query.driver_id;

  if (driver_id) {
    const driverValidation = await Driver.findAll({
      where: {
        id: driver_id,
      },
    });

    if (!driverValidation || driverValidation.length === 0) {
      throw {
        error_code: "INVALID_DRIVER",
        error_description: "Motorista inválido",
        statusCode: 400,
      };
    }
  }

  const rides = await Ride.findAll({
    where: {
      customer_id,
      ...(driver_id && { driver_id: Number(driver_id) }), // Filtra por motorista, se informado
    },
    include: [
      {
        model: Driver,
        attributes: ["id", "name"], // Inclui informações do motorista
      },
    ],
    order: [["createdAt", "DESC"]], // Ordena da mais recente para a mais antiga
  });

  if (!rides || rides.length === 0) {
    throw {
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhum registro encontrado",
      statusCode: 404
    };
  }

  const response = {
    customer_id,
    rides: rides.map((ride) => ({
      id: ride.id,
      date: ride.createdAt,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: ride.driver, // Inclui informações do motorista
      value: ride.value,
    })),
  };

  return response

}
