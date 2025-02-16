import StarShipInventoryStub from "../spi/stubs/StarShipInventoryStub";
import InMemoryFleets from "../spi/stubs/InMemoryFleets";
import FleetAssembler, { MINIMAL_CARGO_CAPACITY } from "../FleetAssembler";
import { StarShip } from "../StarShip";

test("should assemble a fleet for 1050 passengers", async () => {
  const starShips = [
    { name: "no-passenger-ship", passengersCapacity: 0, cargoCapacity: 0 },
    { name: "xs", passengersCapacity: 10, cargoCapacity: 1000 },
    { name: "s", passengersCapacity: 50, cargoCapacity: 50000 },
    { name: "m", passengersCapacity: 200, cargoCapacity: 70000 },
    { name: "l", passengersCapacity: 800, cargoCapacity: 150000 },
    { name: "xl", passengersCapacity: 2000, cargoCapacity: 500000 },
  ];
  const numberOfPassengers = 1050;

  const starShipInventory = StarShipInventoryStub(starShips);
  const fleets = InMemoryFleets();
  const assembleAFleet = FleetAssembler(starShipInventory, fleets);

  const fleet = await assembleAFleet.forPassengers(numberOfPassengers);

  console.log(fleet);
  expect(
    enoughCapacityForThePassengers(numberOfPassengers, fleet.starships),
  ).toBe(true);
  expect(fleet.starships.every(hasPassengersCapacity)).toBe(true);
  expect(fleet.starships.every(hasEnoughCargoCapacity)).toBe(true);
});

function enoughCapacityForThePassengers(
  numberOfPassengers: number,
  starShips: StarShip[],
): boolean {
  return (
    starShips
      .map((ship) => ship.passengersCapacity)
      .reduce((sum, capacity) => sum + capacity, 0) >= numberOfPassengers
  );
}

function hasPassengersCapacity(starShip: StarShip): boolean {
  return starShip.passengersCapacity > 0;
}

function hasEnoughCargoCapacity(starShip: StarShip): boolean {
  return starShip.cargoCapacity >= MINIMAL_CARGO_CAPACITY;
}
