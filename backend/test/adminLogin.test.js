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

describe("POST /api/admin/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAdmin = {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: "hashedAdminPass",
  };

  test("1. should return 200 and a token on successful admin login", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeAdminToken");

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe("fakeAdminToken");
  });

  test("2. should return 400 if email or password is missing", async () => {
    const res = await request(app).post("/api/admin/login").send({ email: mockAdmin.email });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Please fill all fields");
  });

  test("3. should return 400 if the admin is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: "nouser@example.com", password: "adminpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Admin Not Found");
  });

  test("4. should return 400 if the password is incorrect", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid Password");
  });

  test("5. should sign the JWT with role:'admin'", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeAdminToken");

    await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockAdmin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  });

  test("6. should return 500 if the DB query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(res.statusCode).toBe(500);
  });

  test("7. should return 500 if bcrypt.compare throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockRejectedValue(new Error("compare error"));

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(res.statusCode).toBe(500);
  });

  test("8. should return 500 if jwt.sign throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockImplementation(() => {
      throw new Error("jwt error");
    });

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(res.statusCode).toBe(500);
  });

  test("9. should return the admin object without the password field", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeAdminToken");

    const res = await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(res.body.admin).toEqual({
      id: mockAdmin.id,
      name: mockAdmin.name,
      email: mockAdmin.email,
    });
    expect(res.body.admin.password).toBeUndefined();
  });

  test("10. should query the admins table (not the users table)", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockAdmin] });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeAdminToken");

    await request(app)
      .post("/api/admin/login")
      .send({ email: mockAdmin.email, password: "adminpass" });

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM admins WHERE email=$1",
      [mockAdmin.email]
    );
  });
});