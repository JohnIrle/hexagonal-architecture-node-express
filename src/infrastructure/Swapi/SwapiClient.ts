import { StarShip } from "../../domain/StarShip";
import axios from "axios";
import { SwapiResponse } from "./model/SwapiResponse";
import { SwapiStarShip } from "./model/SwapiStarShip";
import { StarShipInventory } from "../../domain/spi/StarShipInventory";

const invalidCapacitiesValues = ["n/a", "unknown"];

export default function SwapiClient(): StarShipInventory {
  return {
    async starShips(): Promise<StarShip[]> {
      const starShips: StarShip[] = [];

      let nextPageUrl = process.env.SWAPI_BASE_URL + "/api/starships";
      while (nextPageUrl != null) {
        try {
          const swapiResponse = await getStarShipsFromSwapi(nextPageUrl);
          starShips.push(...convertSwapiResponseToStartShips(swapiResponse));
          nextPageUrl = swapiResponse.next;
        } catch {
          break;
        }
      }
      return starShips;
    },
  };
}

async function getStarShipsFromSwapi(url: string): Promise<SwapiResponse> {
  const response = await axios.get<SwapiResponse>(url);
  return response.data;
}

function convertSwapiResponseToStartShips(swapiResponse: SwapiResponse) {
  return swapiResponse.results.filter(hasValidPassengersValue).map(toStarShip);
}

function toStarShip(swapiStarShip: SwapiStarShip): StarShip {
  return {
    name: swapiStarShip.name,
    passengersCapacity: Number(swapiStarShip.passengers.replaceAll(",", "")),
    cargoCapacity: Number(swapiStarShip.cargo_capacity),
  };
}

function hasValidPassengersValue(swapiStarShip: SwapiStarShip) {
  return (
    swapiStarShip.passengers != null &&
    !invalidCapacitiesValues.includes(swapiStarShip.passengers) &&
    !invalidCapacitiesValues.includes(swapiStarShip.cargo_capacity)
  );
}
