export interface RideRequestType{
    user: string;
    origin: string;
    destination: string
}
export interface ErrorRequestType{
    error_code: string;
    error_description: string
}
export interface RideResponseType{
    origin: RideCordinate;
    destination: RideCordinate;
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: object;
}
interface RideCordinate{
    latitude: number;
    longitude: number;
}
export interface Driver{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review:{
        rating: number;
        comment: string;
    }
    value: number
}