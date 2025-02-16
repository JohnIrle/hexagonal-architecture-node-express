import { Fleet } from "../Fleet";

export interface AssembleAFleet {
  forPassengers(numberOfPassengers: number): Promise<Fleet>;
}
