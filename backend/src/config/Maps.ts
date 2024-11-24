import { RoutesClient } from "@googlemaps/routing";
import { GoogleAuth } from "google-auth-library";

export const mapsClient = new RoutesClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_API_KEY!),
});
