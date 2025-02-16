import { StarShip } from "../StarShip";

export interface StarShipInventory {
  starShips(): Promise<StarShip[]>;
}
