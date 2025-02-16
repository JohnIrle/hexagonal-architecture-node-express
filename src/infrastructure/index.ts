import express from "express";
import morgan from "morgan";
import RescueFleetRouter from "./routes/RescueFleet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const logger = morgan("tiny");

app.use(logger);
app.use("/rescueFleets", RescueFleetRouter);
app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}`);
});
