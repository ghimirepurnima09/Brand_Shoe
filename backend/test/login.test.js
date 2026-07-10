import { jest } from "@jest/globals";

jest.unstable_mockModule("../config/db.js", () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: { hash: jest.fn(), compare: jest.fn() },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: { sign: jest.fn(), verify: jest.fn() },
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

const request = (await import("supertest")).default;
const app = (await import("../app.js")).default;
const pool = (await import("../config/db.js")).default;
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;

describe("POST /api/auth/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    name: "Purnima",
    email: "purnima@example.com",
    phone: "9800000000",
    password: "hashedPassword123",
  };

  test("1. should return 200 and a token on successful login", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken123");

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe("fakeToken123");
    expect(res.body.message).toBe("Login Successful");
  });

  test("2. should return 400 if the user is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nouser@example.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User Not Found");
  });

  test("3. should return 400 if the password is incorrect", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid Password");
  });

  test("4. should sign the JWT with the user id and a 7 day expiry", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken123");

    await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  });

  test("5. should return the user object without the password field", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken123");

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(res.body.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
    });
    expect(res.body.user.password).toBeUndefined();
  });

  test("6. should return 500 if the DB query throws", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server Error");
  });

  test("7. should return 500 if bcrypt.compare throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockRejectedValue(new Error("bcrypt error"));

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(res.statusCode).toBe(500);
  });

  test("8. should return 500 if jwt.sign throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockImplementation(() => {
      throw new Error("jwt error");
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(res.statusCode).toBe(500);
  });

  test("9. should compare the plain-text password against the stored hash", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken123");

    await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "123456" });

    expect(bcrypt.compare).toHaveBeenCalledWith("123456", mockUser.password);
  });

  test("10. should return 404 for GET on the login endpoint (route only accepts POST)", async () => {
    const res = await request(app).get("/api/auth/login");
    expect(res.statusCode).toBe(404);
  });
});