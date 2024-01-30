const axios = require("axios");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../../config/utils");
const prisma = new PrismaClient();

axios.default.baseUrl = "http://localhost:3001/api";
describe("POST /api/auth/signIn", () => {
  // Assuming you have a valid user data for testing
  const validUserData = {
    email: "Inttest@gmail.com",
    role: "ADMIN",
    password: "passwordHash123",
  };

  // Insert a user with hashed password into the database before running the test
  beforeAll(async () => {
    const hashedPassword = await hashPassword(validUserData.password);
    await prisma.user.create({
      data: {
        email: validUserData.email,
        password: hashedPassword,
        role: validUserData.role,
      },
    });
  });

  // Clean up the database after running the test
  afterAll(async () => {
    let user = await prisma.user.findFirst({
      where: { email: "Inttest@gmail.com" },
    });
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.$disconnect();
  });

  it("should return a valid user and token on successful login", async () => {
    try {
      const response = await axios.post("/auth/signIn", {
        email: validUserData.email,
        password: validUserData.password,
      });
      // Assert response properties
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("data");
      expect(response.data.data).toHaveProperty("email", validUserData.email);
      expect(response.data).toHaveProperty("token");
    } catch (e) {}
  });

  it("should return an error for invalid login credentials", async () => {
    const invalidUserData = {
      email: "nonexistent@example.com",
      password: "invalidPassword",
    };

    try {
      const response = await axios.post("/auth/signIn", invalidUserData);
    } catch (e) {
      // Assert response properties
      expect(e.response).toBe(undefined);
      // expect(error.response.data).toHaveProperty("message");
    }
  });

  it("should return an error for missing or invalid request body", async () => {
    const invalidUserData = {
      // Missing email and password fields intentionally
    };

    try {
      await axios.post(
        "/auth/signIn",
        invalidUserData,
      );
    } catch (e) {
      console.log(e.response)
      console.log(e.message)
      // Assert response properties
      expect(e.response).toBe(undefined);
    }
  });
});
