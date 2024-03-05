import CalculateRide from "../../application/usecase/CalculateRide";
import CreateDriver from "../../application/usecase/CreateDriver";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import GetDriver from "../../application/usecase/GetDriver";
import GetPassenger from "../../application/usecase/GetPassenger";
import HttpServer from "./HttpServer";

export default class MainController {

    constructor (
        httpServer: HttpServer,
        calculateRide: CalculateRide,
        createPassenger: CreatePassenger,
        getPassenger: GetPassenger,
        createDriver: CreateDriver,
        getDriver: GetDriver
    ) {
        httpServer.on("post", "/calculate_ride", async function (params: any, body: any) {    
            const output = await calculateRide.execute(body);
            return output;
        });
        
        httpServer.on("post", "/passengers", async function (params: any, body: any) {
            const output = await createPassenger.execute(body);        
            return output;
        });
        
        httpServer.on("get", "/passengers/:{passengerId}", async function (params: any, body: any) {        
            const output = await getPassenger.execute(params);                
            return output;    
        });
        
        httpServer.on("post", "/drivers", async function (params: any, body: any) {
            const output = await createDriver.execute(body);        
            return output;
        });
        
        httpServer.on("get", "/drivers/:{driverId}", async function (params: any, body: any) {         
            const output = await getDriver.execute(params);
            return output;    
        });
    }
}