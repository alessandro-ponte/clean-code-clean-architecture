// @ts-nocheck
import express from "express";
import { isOvernight, isSunday, isValidDistance, isValidDate } from "./RideCalculator";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function(req, res){
    let price = 0;
    for (const segment of req.body.segments) {        
        segment.date = new Date(segment.date);
        if (!isValidDistance(segment)) return res.json({ price: -1 });
        if (!isValidDate(segment)) return res.json({ price: -2 });
        if (isOvernight(segment) && !isSunday(segment)) {
            price += segment.distance * 3.90;
        }
        if (isOvernight(segment) && isSunday(segment)) {
            price = segment.distance * 5;
        }
        if (!isOvernight(segment) && isSunday(segment)) {
            price += segment.distance * 2.9;
        } 
        if (!isOvernight(segment) && !isSunday(segment)) {
            price += segment.distance * 2.10;
        }                    
    }    
    price = (price < 10) ? 10 : price;    
    res.json({ price });
    return;
});

app.listen(3000);
