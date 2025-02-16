import request from "supertest";
import { app } from "../../app";
import axios from "axios";
import page1 from "../../Swapi/mockData/swapi-page1.json";
import page2 from "../../Swapi/mockData/swapi-page2.json";
import { FleetResource } from "../../types/FleetResource";

jest.mock("axios");

test("should assemble a fleet", async () => {
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: page1,
  });
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: page2,
  });

  const response = await request(app)
    .post("/rescueFleets")
    .send({
      numberOfPassengers: 3,
    })
    .expect(200);

  const body = response.body as FleetResource;

  expect(body.id).toBeDefined();
  expect(body.starships.length).toEqual(1);
  expect(body.starships[0].name).toEqual("CR90 corvette");
  expect(body.starships[0].capacity).toEqual(600);
});
