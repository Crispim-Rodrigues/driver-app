import { RoutesClient } from "@googlemaps/routing";
import { GoogleAuth } from "google-auth-library";

export const routeEstimateClient = new RoutesClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_API_KEY!),
});
