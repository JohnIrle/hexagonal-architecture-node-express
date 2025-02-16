import { SwapiStarShip } from "./SwapiStarShip";

export type SwapiResponse = {
  next: string;
  results: SwapiStarShip[];
};
