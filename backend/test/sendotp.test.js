import { jest } from "@jest/globals";

const mockSendMail = jest.fn().mockResolvedValue(true);

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
    createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
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
const nodemailer = (await import("nodemailer")).default;

describe("POST /api/auth/sendotp", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = { id: 1, email: "purnima@example.com" };

  test("1. should return 200 and a success message when OTP is sent", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    const res = await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("OTP Sent Successfully");
  });

  test("2. should return 400 if the user is not found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).post("/api/auth/sendotp").send({ email: "nouser@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User Not Found");
  });

  test("3. should generate a 6-digit numeric OTP and store it in the DB", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    const updateCallArgs = pool.query.mock.calls[1];
    expect(updateCallArgs[0]).toBe("UPDATE users SET otp=$1 WHERE email=$2");
    expect(updateCallArgs[1][0]).toMatch(/^\d{6}$/);
    expect(updateCallArgs[1][1]).toBe(mockUser.email);
  });

  test("4. should send an email via nodemailer", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ service: "gmail" })
    );
    expect(mockSendMail).toHaveBeenCalled();
  });

  test("5. should return 500 if the select query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server Error");
  });

  test("6. should return 500 if the update query fails", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockRejectedValueOnce(new Error("update failed"));

    const res = await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(res.statusCode).toBe(500);
  });

  test("7. should return 500 if sending the email fails", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});
    mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

    const res = await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(res.statusCode).toBe(500);
  });

  test("8. should send the email to the address the user requested", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: mockUser.email })
    );
  });

  test("9. should include the subject 'Brand_Shoe OTP' in the email", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "Brand_Shoe OTP" })
    );
  });

  test("10. should look up the user using the email from the request body", async () => {
    pool.query.mockResolvedValueOnce({ rows: [mockUser] }).mockResolvedValueOnce({});

    await request(app).post("/api/auth/sendotp").send({ email: mockUser.email });

    expect(pool.query).toHaveBeenNthCalledWith(
      1,
      "SELECT * FROM users WHERE email=$1",
      [mockUser.email]
    );
  });
});