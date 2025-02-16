import { StarShip } from "../../domain/StarShip";

export type StarShipResource = {
  name: string;
  capacity: number;
  passengersCapacity: number;
  deprecations: Map<string, string>;
};

export function NewStarShipResource(starShip: StarShip) {
  return {
    name: starShip.name,
    capacity: starShip.passengersCapacity,
    passengersCapacity: starShip.passengersCapacity,
    deprecations: { capacity: "passengersCapacity" },
  };
}
