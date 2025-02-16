import express from "express";
import morgan from "morgan";
import RescueFleetRouter from "./routes/RescueFleet";

const app = express();
const logger = morgan("tiny");

app.use(logger);
app.use("/rescueFleets", RescueFleetRouter);


export {app}
