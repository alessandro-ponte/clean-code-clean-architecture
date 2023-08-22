import Ride from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import CompletedRideStatus from "./CompletedRideStatus";
import RequestedRideStatus from "./RequestedRideStatus";
import InProgressRideStatus from "./InProgressRideStatus";

export default class RideStatusFactory {
    static create (ride: Ride, status: string) {        
        if(status === 'requested') {
            return new RequestedRideStatus(ride);
        }
        if(status === 'accepted') {
            return new AcceptedRideStatus(ride);
        }
        if(status === 'in_progress') {
            return new InProgressRideStatus(ride);
        }
        if(status === 'completed') {
            return new CompletedRideStatus(ride);
        }
        throw new Error ('Invalid status');
    }
}