import type { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import FleetAssembler from "../../domain/FleetAssembler";
import InMemoryFleets from "../../domain/spi/stubs/InMemoryFleets";
import { RescueFleetRequest } from "../types/RescueFleetRequest";
import { NewFleetResource } from "../types/FleetResource";
import SwapiClient from "../Swapi/SwapiClient";

interface RescueFleetRequestBody extends Request {
  body: RescueFleetRequest;
}

const fleets = InMemoryFleets();

async function assembleAFleet(req: RescueFleetRequestBody, res: Response) {
  const inventory = SwapiClient();
  const assembleAFleet = FleetAssembler(inventory, fleets);
  const fleet = await assembleAFleet.forPassengers(req.body.numberOfPassengers);
  const fleetResource = NewFleetResource(fleet);

  res.json(fleetResource);
}

function getFleetById(req: Request, res: Response) {
  const fleet = fleets.getById(req.params.id);
  if (!fleet) {
    res.status(404);
    res.end();
  } else {
    res.send(NewFleetResource(fleet));
  }
}

const router = express.Router();

router.route("/").post(bodyParser.json(), assembleAFleet);
router.route("/:id").get(getFleetById);

export default router;
