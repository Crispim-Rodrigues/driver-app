export interface RequestRoute {
  routes: Route[];
}

export interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: Duration;
}
export interface Duration {
  seconds: string;
  nanos: number;
}
export interface Leg {
  startLocation: Location;
  endLocation: Location;
}

export interface Location {
  latLng: LatLng;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}
