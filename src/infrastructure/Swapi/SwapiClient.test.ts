import axios from "axios";
import page1 from "./mockData/swapi-page1.json";
import page2 from "./mockData/swapi-page2.json";
import SwapiClient from "./SwapiClient";

jest.mock("axios");

test("should return the starship inventory", async () => {
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: page1,
  });
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: page2,
  });

  const starships = await SwapiClient().starShips();

  expect(starships).toEqual([
    { name: "CR90 corvette", passengersCapacity: 600, cargoCapacity: 3000000 },
    { name: "Slave 1", passengersCapacity: 6, cargoCapacity: 70000 },
    {
      name: "Death Star",
      passengersCapacity: 843342,
      cargoCapacity: 1000000000000,
    },
  ]);
});
