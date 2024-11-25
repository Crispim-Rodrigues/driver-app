import sequelize from "../config/database";
import Ride from "../models/ride.model";

export async function pendingRide(
  user: number,
  origin: string,
  destination: string,
  distance: number,
  duration: string
): Promise<void> {
  const transaction = await sequelize.transaction();
  try {
    const pendingRide = await Ride.findAll({
      where: {
        customer_id: user,
        status: "pending",
      },
      transaction,
    });
    if (pendingRide) {
      await Ride.destroy({
        where: {
          customer_id: user,
          status: "pending",
        },
        transaction,
      });
    }

    await Ride.create(
      {
        customer_id: user,
        origin: origin,
        destination: destination,
        distance: distance,
        duration: duration,
        status: "pending",
      },
      { transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw {
      error_code: "TRANSACTION_ERROR",
      error_description: "Erro em salvar a viagem",
    };
  }
}
