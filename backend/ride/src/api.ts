import express from "express";
import pgp from 'pg-promise';
import Ride from "./Ride"
import Passenger from "./Passenger";
import crypto from 'crypto';
const app = express();

app.use(express.json());

app.post("/calculate_ride", function(req , res){    
    try{        
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        res.json({ price });
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.post("/passengers", async function(req, res){    
    try{
        const input = req.body;
        const passengerId = crypto.randomUUID();
        const connection = pgp()("postgres://postgres@localhost:5432/app");
        await connection.query('insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)', [passengerId, input.name, input.email, input.document]);
        await connection.$pool.end();
        // const passenger = new Passenger(input.name, input.email, input.document);                
        res.json({ passengerId });
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.get("/passengers/:passengerId", async function(req, res){
    try{
        const input = req.params;        
        const connection = pgp()("postgres://postgres@localhost:5432/app");
        const [passengerData] = await connection.query('select * from cccat12.passenger where passenger_id = $1', [input.passengerId]);
        await connection.$pool.end();
        // const passenger = new Passenger(input.name, input.email, input.document);                
        res.json( passengerData );
    } catch (e: any) {
        res.status(422).send(e.message);
    }    
});

app.post("/drivers", async function(req, res){    
    try{
        const input = req.body;
        const driverId = crypto.randomUUID();
        const connection = pgp()("postgres://postgres@localhost:5432/app");
        await connection.query('insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)', [driverId, input.name, input.email, input.document, input.carPlate]);
        await connection.$pool.end();
        // const passenger = new Passenger(input.name, input.email, input.document);                
        res.json({ driverId });
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.get("/drivers/:driverId", async function(req, res){
    try{
        const input = req.params;        
        const connection = pgp()("postgres://postgres@localhost:5432/app");
        const [driverData] = await connection.query('select * from cccat12.driver where driver_id = $1', [input.driverId]);
        await connection.$pool.end();
        // const passenger = new Passenger(input.name, input.email, input.document);                
        res.json({ 
            driverId: driverData.driver_id,
            name: driverData.name,
            email: driverData.email,
            document: driverData.document,
            carPlate: driverData.car_plate
        });
    } catch (e: any) {
        res.status(422).send(e.message);
    }    
});

app.listen(3000);
