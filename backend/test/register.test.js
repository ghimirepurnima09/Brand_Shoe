/**
 * register.test.js
 * ---------------------------------------------------------------------------
 * Route:      POST /api/auth/register
 * Controller: register  (src/controllers/authController.js)
 * ---------------------------------------------------------------------------
 */

import { jest } from "@jest/globals";

// -----------------------------------------------------------------------
// STEP 1: Mock every dependency BEFORE importing the app
// -----------------------------------------------------------------------
jest.unstable_mockModule("../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
}));

jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: jest.fn(() => ({
      sendMail: jest.fn().mockResolvedValue(true),
    })),
  },
}));

jest.unstable_mockModule("multer", () => {
  const multerMock = () => ({
    single: () => (req, res, next) => next(),
    array: () => (req, res, next) => next(),
    fields: () => (req, res, next) => next(),
    none: () => (req, res, next) => next(),
  });
  multerMock.diskStorage = () => ({});
  multerMock.memoryStorage = () => ({});
  return { default: multerMock };
});

jest.unstable_mockModule("../socket.js", () => ({
  getIO: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    emit: jest.fn(),
  })),
}));

// -----------------------------------------------------------------------
// STEP 2: Import AFTER mocks are registered
// -----------------------------------------------------------------------
const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const pool = (await import("../config/db.js")).default;
const bcrypt = (await import("bcryptjs")).default;

// -----------------------------------------------------------------------
// STEP 3: Standard suite hygiene
// -----------------------------------------------------------------------
describe("POST /api/auth/register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const validPayload = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "SecurePass123",
  };

  // -----------------------------------------------------------------
  test("1. should register a new user successfully", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [] })             // userExists check
      .mockResolvedValueOnce({ rows: [] });             // INSERT
    bcrypt.hash.mockResolvedValueOnce("hashed_password");

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Registration Successful");
    expect(bcrypt.hash).toHaveBeenCalledWith(validPayload.password, 10);
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  // -----------------------------------------------------------------
  test("2. should return 500 when email field is missing (missing required field)", async () => {
    // Arrange
    const { email, ...payloadWithoutEmail } = validPayload;
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockRejectedValueOnce(new Error("Illegal argument: undefined"));

    // Act
    const res = await request(app).post("/api/auth/register").send(payloadWithoutEmail);

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });

  // -----------------------------------------------------------------
  test("3. should return 500 when password is an invalid type (invalid input)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockRejectedValueOnce(new Error("data and salt arguments required"));

    // Act
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validPayload, password: null });

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });

  // -----------------------------------------------------------------
  test("4. should return 400 when attempting to register with a malformed email string but existing check still runs (invalid ID equivalent)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: "not-an-email" }] });

    // Act
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validPayload, email: "not-an-email" });

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("User already exists");
  });

  // -----------------------------------------------------------------
  test("5. should return 400 when attempting to look up a non-existent record path gracefully (resource check)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce("hashed_password");
    pool.query.mockResolvedValueOnce({ rows: [] });

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // -----------------------------------------------------------------
  test("6. should return 400 when the user already exists (duplicate data)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: validPayload.email }],
    });

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("User already exists");
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------------
  test("7. should process registration without requiring an Authorization header (unauthorized access N/A)", async () => {
    // Arrange
    pool.query.mockResolvedValueOnce({ rows: [] }).mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce("hashed_password");

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // -----------------------------------------------------------------
  test("8. should return 500 when the database fails during the existence check (database failure)", async () => {
    // Arrange
    pool.query.mockRejectedValueOnce(new Error("Connection terminated unexpectedly"));

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Connection terminated unexpectedly");
  });

  // -----------------------------------------------------------------
  test("9. should return 500 when the INSERT query fails after a successful existence check (server error)", async () => {
    // Arrange
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockRejectedValueOnce(new Error("INSERT statement failed"));
    bcrypt.hash.mockResolvedValueOnce("hashed_password");
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Act
    const res = await request(app).post("/api/auth/register").send(validPayload);

    // Assert
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("INSERT statement failed");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------
  test("10. should handle an extremely long password string gracefully (edge case)", async () => {
    // Arrange
    const longPassword = "P@ssw0rd".repeat(50);
    pool.query.mockResolvedValueOnce({ rows: [] }).mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce("hashed_long_password");

    // Act
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validPayload, password: longPassword });

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(bcrypt.hash).toHaveBeenCalledWith(longPassword, 10);
  });
});