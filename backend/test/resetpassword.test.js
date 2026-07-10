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

describe("POST /api/auth/resetpassword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    email: "purnima@example.com",
    otp: "123456",
    password: "oldHashedPassword",
  };
  const validBody = { email: mockUser.email, otp: "123456", password: "newPassword123" };

  test("1. should return 200 on a successful password reset", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});
    bcrypt.compare.mockResolvedValue(false);
    bcrypt.hash.mockResolvedValue("newHashedPassword");

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Password Reset Successful");
  });

  test("2. should return 400 if the user is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User Not Found");
  });

  test("3. should return 400 if the OTP does not match", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const res = await request(app)
      .post("/api/auth/resetpassword")
      .send({ ...validBody, otp: "000000" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid OTP");
  });

  test("4. should return 400 if the new password matches the old password", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("New password cannot be old password");
  });

  test("5. should hash the new password before saving", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});
    bcrypt.compare.mockResolvedValue(false);
    bcrypt.hash.mockResolvedValue("newHashedPassword");

    await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(bcrypt.hash).toHaveBeenCalledWith(validBody.password, 10);
  });

  test("6. should update the password and clear the OTP in the DB", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});
    bcrypt.compare.mockResolvedValue(false);
    bcrypt.hash.mockResolvedValue("newHashedPassword");

    await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(pool.query).toHaveBeenNthCalledWith(
      2,
      "UPDATE users SET password=$1, otp=NULL WHERE email=$2",
      ["newHashedPassword", mockUser.email]
    );
  });

  test("7. should return 500 if the select query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(500);
  });

  test("8. should return 500 if the update query fails", async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [mockUser] })
      .mockRejectedValueOnce(new Error("update failed"));
    bcrypt.compare.mockResolvedValue(false);
    bcrypt.hash.mockResolvedValue("newHashedPassword");

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(500);
  });

  test("9. should return 500 if bcrypt.compare throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockRejectedValue(new Error("compare error"));

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(500);
  });

  test("10. should return 500 if bcrypt.hash throws", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });
    bcrypt.compare.mockResolvedValue(false);
    bcrypt.hash.mockRejectedValue(new Error("hash error"));

    const res = await request(app).post("/api/auth/resetpassword").send(validBody);

    expect(res.statusCode).toBe(500);
  });
});