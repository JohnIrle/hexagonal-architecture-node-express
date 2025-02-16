import { Fleet } from "../../domain/Fleet";
import { NewStarShipResource, StarShipResource } from "./StarShipResource";

export type FleetResource = {
  id: string;
  starships: StarShipResource[];
};

export function NewFleetResource(fleet: Fleet) {
  return { id: fleet.id, starships: fleet.starships.map(NewStarShipResource) };
}
