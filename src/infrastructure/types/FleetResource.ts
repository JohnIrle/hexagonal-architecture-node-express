import { StarShip } from "../../domain/StarShip";
import { Fleet } from "../../domain/Fleet";
import { NewStarShipResource } from "./StarShipResource";

export type FleetResource = {
  id: string;
  starships: StarShip[];
};

export function NewFleetResource(fleet: Fleet) {
  return { id: fleet.id, starships: fleet.starships.map(NewStarShipResource) };
}
