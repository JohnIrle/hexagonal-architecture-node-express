import { Fleet } from "../../Fleet";
import { Fleets } from "../Fleets";

export default function InMemoryFleets(): Fleets {
  const fleets = new Map<string, Fleet>();

  return {
    getById(id: string): Fleet | undefined {
      return fleets.get(id);
    },
    save(fleet: Fleet): Fleet {
      fleets.set(fleet.id, fleet);
      return fleet;
    },
  };
}
