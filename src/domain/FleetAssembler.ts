import { Fleet, NewFleet } from "./Fleet";
import { Fleets } from "./spi/Fleets";
import { StarShipInventory } from "./spi/StarShipInventory";
import { StarShip } from "./StarShip";
import { AssembleAFleet } from "./api/AssembleAFleet";

export const MINIMAL_CARGO_CAPACITY = 100000;

export default function FleetAssembler(
  starshipsInventory: StarShipInventory,
  fleets: Fleets,
): AssembleAFleet {
  async function getStarShipsHavingPassengersCapacity() {
    const starships = await starshipsInventory.starShips();
    return starships
      .filter((starShip) => starShip.passengersCapacity > 0)
      .sort((a, b) => a.passengersCapacity - b.passengersCapacity);
  }

  function selectStartShips(numberOfPassengers: number, starShips: StarShip[]) {
    const filtered = starShips.filter(
      (starShip) => starShip.cargoCapacity > MINIMAL_CARGO_CAPACITY,
    );
    const rescueStarShips = [];
    while (numberOfPassengers > 0) {
      const starShip = filtered.shift();
      if (starShip) {
        numberOfPassengers -= starShip?.passengersCapacity;
        rescueStarShips.push(starShip);
      }
    }
    return rescueStarShips;
  }

  return {
    async forPassengers(numberOfPassengers: number): Promise<Fleet> {
      const starShips = await getStarShipsHavingPassengersCapacity();
      const rescueStarShips = selectStartShips(numberOfPassengers, starShips);
      return fleets.save(NewFleet(rescueStarShips));
    },
  };
}
