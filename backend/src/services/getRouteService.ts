import { mapsClient } from "../config/maps";
import { RequestRoute } from "../types/maps";

export async function getRouteService(origin: string, destination: string) {
  try {
    const [ routes ] = await mapsClient.computeRoutes(
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
        travelMode: "DRIVE",
      },
      {
        otherArgs: {
          headers: {
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation",
          },
        },
      }
    );
    
    const response = routes as RequestRoute

    return response.routes[0] ;
  } catch (error: any) {
    console.error("Error fetching route from Google Maps:", error);
    throw {
      error_code: "FETCHING_ERROR",
      error_description: error.message || "Falha na solicitação de rota",
    };
  }
}
