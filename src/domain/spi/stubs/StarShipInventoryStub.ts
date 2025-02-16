import { StarShip } from "../../StarShip";
import { StarShipInventory } from "../StarShipInventory";

const DEFAULT_STARSHIPS: StarShip[] = [
  { name: "X-Wing", passengersCapacity: 0, cargoCapacity: 100 },
  { name: "Millennium Falcon", passengersCapacity: 6, cargoCapacity: 100000 },
  { name: "Rebel transport", passengersCapacity: 90, cargoCapacity: 80000 },
  {
    name: "Mon Calamari Star Cruisers",
    passengersCapacity: 1200,
    cargoCapacity: 200000,
  },
  { name: "CR90 corvette", passengersCapacity: 600, cargoCapacity: 300000 },
  {
    name: "EF76 Nebulon-B escort frigate",
    passengersCapacity: 800,
    cargoCapacity: 350000,
  },
];

export default function StarShipInventoryStub(
  starShips: StarShip[] = DEFAULT_STARSHIPS,
): StarShipInventory {
  return {
    async starShips(): Promise<StarShip[]> {
      return Promise.resolve(starShips);
    },
  };
}
