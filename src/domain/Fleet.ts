import { v4 as uuidv4 } from "uuid";
import { StarShip } from "./StarShip";

export type Fleet = {
  id: string;
  starships: StarShip[];
};

export function NewFleet(starships: StarShip[]): Fleet {
  return {
    id: uuidv4(),
    starships,
  };
}
