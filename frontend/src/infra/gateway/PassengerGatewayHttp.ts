import axios from "axios";
import PassengerGateway from "./PassengerGateway";

export default class PassengerGatewayHttp implements PassengerGateway {
    async save (passenger: any) {
        const response = await axios.post('http://localhost:3000/passengers', passenger)
        return response.data;
    }
}