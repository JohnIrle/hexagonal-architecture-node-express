import { Fleet } from "../Fleet";

export interface Fleets {
  getById(id: string): Fleet | undefined;
  save(fleet: Fleet): Fleet;
}
