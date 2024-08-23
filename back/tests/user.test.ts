import request from "supertest";
import { app } from "../index";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User Endpoints", () => {
  let userId: number;

  test("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toBe(201); // vérifie le status
    expect(res.body).toHaveProperty("id"); // vérifie que l'id est bien dans la réponse
    userId = res.body.id; // conserve l'ID pour les tests suivants
  });

  test("should fetch all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // vérifie que la réponse est un tableau
  });

  test("should fetch a user by ID", async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", userId); // vérifie que l'id retourné est correct
    expect(res.body.name).toBe("John Doe"); // vérifie le nom de l'utilisateur/utilisatrice
  });
});
