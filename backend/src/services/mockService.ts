import { getRouteService } from "./getRouteService";
import Driver from "../models/driver.model";
import { Op } from "sequelize";

export async function mockService(origin: string, destination: string) {
  const routeResponse = await getRouteService(origin, destination);
  const distanceKm = routeResponse.distanceMeters / 1000;

  if (routeResponse.distanceMeters <= 50) {
    throw {
      error_code: "INVALID_DATA",
      error_description:
        "Os endereços de origem e destino não podem ser o mesmo endereço.",
    };
  }

  const existingDrivers = await Driver.findAll({
    where: {
      min_km: { [Op.lte]: distanceKm },
    },
    order: [["price_per_km", "ASC"]],
  });

  if (existingDrivers.length <= 0)
    throw {
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    };
  // Aqui você pode usar os dados reais do Maps para calcular
  const mockResult = {
    origin: routeResponse.legs[0].startLocation.latLng,
    destination: routeResponse.legs[0].endLocation.latLng,
    distance: routeResponse.distanceMeters,
    duration: routeResponse.duration.seconds,
    options: [
      existingDrivers.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: { rating: driver.rating, comment: driver.comment },
          value: Math.round(driver.price_per_km * distanceKm * 100) / 100,
        };
      }),
    ],
    routeResponse, // Inclui a resposta bruta do Google Maps se necessário
  };

  return mockResult;
}
