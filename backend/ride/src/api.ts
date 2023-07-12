// @ts-nocheck
import express from "express";
import { calculate } from "./RideCalculator";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function(req, res){
    for (const segment of req.body.segments) {
        segment.date = new Date(segment.date)
    }
    const price = calculate(req.body.segments);
    res.json({ price });
    return;
});

app.listen(3000);
