import Driver from '../models/driver.model';
import Ride from '../models/ride.model';

interface request extends Ride{
    driver: Driver;
}

export async function confirmService(newRideData: request): Promise<boolean>{

    const pendingRide = await Ride.findOne({
        where:{
            customer_id: newRideData.customer_id,
            status:"pending"
        }
    })
    const requestDriver = await Driver.findOne({
        where:{
            id: newRideData.driver.id
        }
    })
    if(!pendingRide) throw {
        error_code: "INVALID_DATA",
        error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        statusCode: 400
    }
    if(!requestDriver) throw {
        error_code: "DRIVER_NOT_FOUND",
        error_description: "Motorista não encontrado",
        statusCode: 404
    }
    const distanceKm = pendingRide!.distance / 1000
    if(distanceKm < requestDriver.min_km) throw {
        error_code: "INVALID_DISTANCE",
        error_description: "Quilometragem inválida para o motorista ",
        statusCode: 406
    }
    const realValue = Math.round(requestDriver!.price_per_km * distanceKm * 100) / 100

    const isValid = await isRideDataValid(pendingRide!, newRideData, realValue)
    
    if (!isValid) throw {
        error_code: "INVALID_DATA",
        error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        statusCode: 400
    }

    await Ride.update({price: realValue, driver_id: requestDriver.id, status: 'confirmed'}, {
        where:{
            customer_id: newRideData.customer_id,
            status:"pending"
        }
    })
    return true

}

async function isRideDataValid(pendingRide: Ride, newRideData: Ride, realValue: number): Promise<boolean> {
    return (
      pendingRide.origin === newRideData.origin &&
      pendingRide.destination === newRideData.destination &&
      pendingRide.distance === newRideData.distance &&
      pendingRide.duration === newRideData.duration &&
      realValue === newRideData.value
    );
  }