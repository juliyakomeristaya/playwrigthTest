import { test, expect } from "../../utils/fixtures/fixtures";
import AuthController from "../../api/controllers/authController";
import CarsController from "../../api/controllers/carsController";
import { testUser1 } from "../../test-data/users";

test.describe("API requests", () => {
  let authController: AuthController;
  let carsController: CarsController;

  let sid: string;
  const newCar = {
    carBrandId: 1,
    carModelId: 1,
    mileage: 6666,
  };

  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    const response = await authController.signIn(
      testUser1.email,
      testUser1.password,
    );
    sid = response;
  });

  test.beforeEach(async ({ request }) => {
    carsController = new CarsController(request);
  });

  test("Get brands via API", async ({ request }) => {
    const response = await request.get("/api/cars/brands");
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.data).toHaveLength(5);
  });

  test("Get models via API", async ({ request }) => {
    const response = await request.get("/api/cars/models");
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.data).toHaveLength(23);
  });

  test("Create new car via API", async ({ request }) => {
    const response = await carsController.addCar(newCar, sid);
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.data).toMatchObject(newCar);
  });

  test("Create car with invalid data mileage via API", async ({ request }) => {
    const newCar = {
      carBrandId: 1,
      carModelId: 1,
      mileage: -1,
    };
    const response = await carsController.addCar(newCar, sid);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain("Mileage has to be from 0 to 999999");
  });

  test("Create car with invalid brand via API", async ({ request }) => {
    const newCar = {
      carBrandId: 100,
      carModelId: 1,
      mileage: 123,
    };
    const response = await carsController.addCar(newCar, sid);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toContain("Brand not found");
  });

  test("Create car with invalid model via API", async ({ request }) => {
    const newCar = {
      carBrandId: 1,
      carModelId: 100,
      mileage: 123,
    };
    const response = await carsController.addCar(newCar, sid);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toContain("Model not found");
  });

  test("Get cars via API", async ({ request }) => {
    const response = await carsController.getCars(sid);
    expect(response.status()).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test("Delete car via API", async ({ request }) => {
    const createResponse = await carsController.addCar(newCar, sid);
    const createdCar = await createResponse.json();
    expect(createResponse.status()).toBe(201);
    expect(createdCar.data).toMatchObject(newCar);

    const deleteResponse = await carsController.removeCar(
      createdCar.data.id,
      sid,
    );
    expect(deleteResponse.status()).toBe(200);
  });

  test("Delete not existing car via API", async ({ request }) => {
    const createResponse = await carsController.addCar(newCar, sid);
    const createdCar = await createResponse.json();
    expect(createResponse.status()).toBe(201);
    expect(createdCar.data).toMatchObject(newCar);
    await carsController.removeCar(createdCar.data.id, sid);

    const deleteResponseNotExisting = await carsController.removeCar(
      createdCar.data.id,
      sid,
    );
    expect(deleteResponseNotExisting.status()).toBe(404);
  });
});
